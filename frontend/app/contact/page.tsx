import type { Metadata } from "next";
import { ContactForm } from "./components/contact-form";
import { GlobalOffices } from "./components/global-offices";
import { ScrollToConversation } from "./components/scroll-to-conversation";
import { SEO } from "@/lib/constants";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: SEO.contact.title,
  description: SEO.contact.description,
};

export default function ContactPage() {
  return (
    <>
      <ScrollToConversation />
      <Toaster position="top-right" richColors />

      {/* Global Offices with 3D Globe */}
      <div className="pt-32">
        <GlobalOffices />
      </div>

      {/* Contact Form Section */}
      <section id="conversation" className="py-16 bg-muted/30 scroll-mt-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Let&apos;s start a{" "}
              <span className="text-accent">Conversation</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Have a project in mind? We&apos;d love to hear from you. Send us a
              message and we&apos;ll respond as soon as possible.
            </p>
          </div>

          {/* Contact Form */}
          <div className="max-w-2xl mx-auto">
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
