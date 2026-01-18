import { getFeaturedTestimonials } from "@/lib/data/content";
import { TestimonialCard } from "./testimonial-card";
import { Quote } from "lucide-react";
import { getTranslations } from "next-intl/server";

export async function Testimonials() {
  const testimonials = await getFeaturedTestimonials();
  const t = await getTranslations("testimonials");

  if (testimonials.length === 0) {
    return null; // Don't render section if no testimonials
  }

  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-accent/10 mb-4">
            <Quote className="h-6 w-6 text-accent" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t("title")}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t("subtitle")}
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
}
