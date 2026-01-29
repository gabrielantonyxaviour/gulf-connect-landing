import { createServerClient } from "@/lib/supabase";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;

type GalleryCompany = "rax-chennai" | "rax-europe" | "gulf-connect";

interface GalleryImage {
  id: string;
  event_id: string;
  filename: string;
  original_filename: string | null;
  storage_path: string;
  sort_order: number;
  created_at: string;
}

interface GalleryEvent {
  id: string;
  company: GalleryCompany;
  title: string;
  description: string | null;
  event_date: string | null;
  slug: string;
  is_active: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

interface GalleryEventWithImages extends GalleryEvent {
  images: GalleryImage[];
}

/**
 * Get the public URL for a gallery image
 */
export function getGalleryImagePublicUrl(storagePath: string): string {
  return `${SUPABASE_URL}/storage/v1/object/public/rax_landing_gallery/${storagePath}`;
}

/**
 * Get a signed URL for a gallery image (works even if bucket is not public)
 */
export async function getGalleryImageSignedUrl(storagePath: string): Promise<string> {
  const supabase = createServerClient();
  const { data, error } = await supabase.storage
    .from("rax_landing_gallery")
    .createSignedUrl(storagePath, 3600); // 1 hour expiry

  if (error || !data?.signedUrl) {
    console.error("Error creating signed URL:", error);
    // Fallback to public URL
    return getGalleryImagePublicUrl(storagePath);
  }

  return data.signedUrl;
}

/**
 * Fetch all active gallery events for a company with their images
 */
export async function getGalleryEvents(
  company: GalleryCompany
): Promise<GalleryEventWithImages[]> {
  const supabase = createServerClient();

  // Get active events
  const { data: events, error } = await supabase
    .from("rax_landing_gallery_events")
    .select("*")
    .eq("company", company)
    .eq("is_active", true)
    .order("sort_order", { ascending: true });

  if (error) {
    console.error("Error fetching gallery events:", error);
    return [];
  }

  if (!events || events.length === 0) {
    return [];
  }

  // Get images for each event
  const eventsWithImages = await Promise.all(
    events.map(async (event) => {
      const { data: images } = await supabase
        .from("rax_landing_gallery_images")
        .select("*")
        .eq("event_id", event.id)
        .order("sort_order", { ascending: true });

      return {
        ...event,
        images: images || [],
      };
    })
  );

  return eventsWithImages as GalleryEventWithImages[];
}

/**
 * Transform gallery events to the format expected by GalleryGrid component
 * Uses signed URLs for images to avoid 404 issues with non-public buckets
 */
export async function transformGalleryEventsForDisplay(
  events: GalleryEventWithImages[]
): Promise<Array<{
  id: string;
  title: string;
  description: string;
  date: string;
  images: string[];
}>> {
  return Promise.all(
    events.map(async (event) => ({
      id: event.id,
      title: event.title,
      description: event.description || "",
      date: event.event_date || "",
      images: await Promise.all(
        event.images.map((img) => getGalleryImageSignedUrl(img.storage_path))
      ),
    }))
  );
}
