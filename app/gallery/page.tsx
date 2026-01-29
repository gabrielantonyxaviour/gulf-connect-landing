import type { Metadata } from "next";
import { SEO } from "@/lib/constants";
import { getGalleryEvents, transformGalleryEventsForDisplay } from "@/lib/data/gallery";
import { GalleryHero } from "./components/gallery-hero";
import { GalleryGrid } from "./components/gallery-grid";

export const metadata: Metadata = {
  title: SEO.gallery.title,
  description: SEO.gallery.description,
};

export const revalidate = 60; // Revalidate every minute

export default async function GalleryPage() {
  // Fetch gallery events from database for gulf-connect
  const events = await getGalleryEvents("gulf-connect");
  const galleryEvents = await transformGalleryEventsForDisplay(events);

  return (
    <>
      <GalleryHero />
      <GalleryGrid events={galleryEvents} />
    </>
  );
}
