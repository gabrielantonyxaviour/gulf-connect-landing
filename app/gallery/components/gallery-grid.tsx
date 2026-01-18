"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";

interface GalleryEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  images: string[];
}

interface GalleryGridProps {
  events: GalleryEvent[];
}

export function GalleryGrid({ events }: GalleryGridProps) {
  const [selectedEvent, setSelectedEvent] = useState<GalleryEvent | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const openLightbox = (event: GalleryEvent, imageIndex: number = 0) => {
    setSelectedEvent(event);
    setSelectedImageIndex(imageIndex);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setSelectedEvent(null);
    setSelectedImageIndex(0);
    document.body.style.overflow = "unset";
  };

  const navigateImage = (direction: "prev" | "next") => {
    if (!selectedEvent) return;
    const totalImages = selectedEvent.images.length;
    if (direction === "prev") {
      setSelectedImageIndex((prev) =>
        prev === 0 ? totalImages - 1 : prev - 1
      );
    } else {
      setSelectedImageIndex((prev) =>
        prev === totalImages - 1 ? 0 : prev + 1
      );
    }
  };

  return (
    <>
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="space-y-16">
            {events.map((event, eventIndex) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: eventIndex * 0.1 }}
              >
                {/* Event Header */}
                <div className="mb-6">
                  <div className="flex items-center gap-2 text-muted-foreground mb-2">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm">{event.date}</span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold mb-2">
                    {event.title}
                  </h2>
                  <p className="text-muted-foreground">{event.description}</p>
                </div>

                {/* Image Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
                  {event.images.map((image, imageIndex) => (
                    <motion.div
                      key={image}
                      initial={{ opacity: 0, scale: 0.95 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.3,
                        delay: imageIndex * 0.05,
                      }}
                      className={cn(
                        "relative aspect-square rounded-lg overflow-hidden cursor-pointer group",
                        imageIndex === 0 && "md:col-span-2 md:row-span-2"
                      )}
                      onClick={() => openLightbox(event, imageIndex)}
                    >
                      <Image
                        src={image}
                        alt={`${event.title} - Image ${imageIndex + 1}`}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        sizes={
                          imageIndex === 0
                            ? "(max-width: 768px) 50vw, 50vw"
                            : "(max-width: 768px) 50vw, 25vw"
                        }
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedEvent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
            onClick={closeLightbox}
          >
            {/* Close button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            >
              <X className="w-6 h-6 text-white" />
            </button>

            {/* Navigation */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                navigateImage("prev");
              }}
              className="absolute left-4 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                navigateImage("next");
              }}
              className="absolute right-4 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </button>

            {/* Image */}
            <motion.div
              key={selectedImageIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full h-full max-w-5xl max-h-[80vh] m-4"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={selectedEvent.images[selectedImageIndex]}
                alt={`${selectedEvent.title} - Image ${selectedImageIndex + 1}`}
                fill
                className="object-contain"
                sizes="100vw"
                priority
              />
            </motion.div>

            {/* Image counter */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full bg-white/10 text-white text-sm">
              {selectedImageIndex + 1} / {selectedEvent.images.length}
            </div>

            {/* Event title */}
            <div className="absolute top-4 left-4 text-white">
              <h3 className="font-semibold">{selectedEvent.title}</h3>
              <p className="text-sm text-white/70">{selectedEvent.date}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
