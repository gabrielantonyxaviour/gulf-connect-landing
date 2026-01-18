import type { Metadata } from "next";
import { SEO } from "@/lib/constants";
import { getGalleryImageUrl } from "@/lib/storage";
import { GalleryHero } from "./components/gallery-hero";
import { GalleryGrid } from "./components/gallery-grid";

export const metadata: Metadata = {
  title: SEO.gallery.title,
  description: SEO.gallery.description,
};

// Gallery events data with Supabase storage URLs
const GALLERY_EVENTS = [
  {
    id: "pongal-2025",
    title: "Pongal Celebration 2025",
    description: "Celebrating the harvest festival with our team",
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
    title: "Environmental Training 2025",
    description: "GEM training and environmental awareness program",
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
    title: "Sports Day 2022",
    description: "Annual sports day celebration with team activities",
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

export default function GalleryPage() {
  return (
    <>
      <GalleryHero />
      <GalleryGrid events={GALLERY_EVENTS} />
    </>
  );
}
