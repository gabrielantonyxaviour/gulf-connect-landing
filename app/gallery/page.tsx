import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { SEO } from "@/lib/constants";
import { getGalleryImageUrl } from "@/lib/storage";
import { GalleryHero } from "./components/gallery-hero";
import { GalleryGrid } from "./components/gallery-grid";

export const metadata: Metadata = {
  title: SEO.gallery.title,
  description: SEO.gallery.description,
};

// Gallery events data with translation keys
const GALLERY_EVENTS_DATA = [
  {
    id: "pongal-2025",
    translationKey: "pongal2025",
    date: "January 2025",
    images: [
      getGalleryImageUrl("pongal-2025", "img_2111.jpeg"),
      getGalleryImageUrl("pongal-2025", "img_2129.jpeg"),
      getGalleryImageUrl("pongal-2025", "img_2129-1.jpeg"),
      getGalleryImageUrl("pongal-2025", "img_2098.jpeg"),
      getGalleryImageUrl("pongal-2025", "img_2114.jpg"),
      getGalleryImageUrl("pongal-2025", "whatsapp-12-10-19.jpeg"),
      getGalleryImageUrl("pongal-2025", "whatsapp-12-11-36.jpeg"),
      getGalleryImageUrl("pongal-2025", "whatsapp-12-27-14.jpeg"),
      getGalleryImageUrl("pongal-2025", "whatsapp-12-28-08.jpg"),
    ],
  },
  {
    id: "environmental-2025",
    translationKey: "environmental2025",
    date: "2025",
    images: [
      getGalleryImageUrl("environmental-2025", "gem_training_img1.jpeg"),
      getGalleryImageUrl("environmental-2025", "gem_training_img2.jpeg"),
      getGalleryImageUrl("environmental-2025", "gem_training_img3.jpeg"),
      getGalleryImageUrl("environmental-2025", "gem_training_img4.jpeg"),
      getGalleryImageUrl("environmental-2025", "gem_training_img5.jpeg"),
    ],
  },
  {
    id: "sports-day-2022",
    translationKey: "sportsDay2022",
    date: "2022",
    images: [
      getGalleryImageUrl("sports-day-2022", "all-1.jpg"),
      getGalleryImageUrl("sports-day-2022", "whatsapp-11-22-56.jpeg"),
      getGalleryImageUrl("sports-day-2022", "whatsapp-11-27-16.jpeg"),
      getGalleryImageUrl("sports-day-2022", "whatsapp-11-32-05.jpeg"),
      getGalleryImageUrl("sports-day-2022", "whatsapp-11-32-06.jpeg"),
      getGalleryImageUrl("sports-day-2022", "whatsapp-11-32-06-1.jpeg"),
    ],
  },
];

export default async function GalleryPage() {
  const t = await getTranslations("gallery.events");

  // Build events with translated content
  const events = GALLERY_EVENTS_DATA.map((event) => ({
    id: event.id,
    title: t(`${event.translationKey}.title`),
    description: t(`${event.translationKey}.description`),
    date: event.date,
    images: event.images,
  }));

  return (
    <>
      <GalleryHero />
      <GalleryGrid events={events} />
    </>
  );
}
