"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Send } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { PhoneInput } from "@/components/ui/phone-input";

interface ContactModalContextType {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

const ContactModalContext = createContext<ContactModalContextType | undefined>(
  undefined
);

export function useContactModal() {
  const context = useContext(ContactModalContext);
  if (!context) {
    throw new Error("useContactModal must be used within a ContactModalProvider");
  }
  return context;
}

export function ContactModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <ContactModalContext.Provider value={{ isOpen, openModal, closeModal }}>
      {children}
      <ContactModal isOpen={isOpen} onClose={closeModal} />
    </ContactModalContext.Provider>
  );
}

function ContactModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  // Prevent body scroll when modal is open
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, backdropFilter: "blur(10px)" }}
          exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
          className="fixed inset-0 h-full w-full flex items-center justify-center z-50"
          style={{ perspective: "800px", transformStyle: "preserve-3d" }}
        >
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 h-full w-full bg-black/50 z-40"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="relative z-50 w-full max-w-2xl mx-4 bg-neutral-950 border border-neutral-800 rounded-2xl overflow-hidden"
            initial={{ opacity: 0, scale: 0.5, rotateX: 40, y: 40 }}
            animate={{ opacity: 1, scale: 1, rotateX: 0, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, rotateX: 10 }}
            transition={{ type: "spring", stiffness: 260, damping: 15 }}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 group z-10"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-white h-5 w-5 group-hover:scale-125 group-hover:rotate-3 transition duration-200"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M18 6l-12 12" />
                <path d="M6 6l12 12" />
              </svg>
            </button>

            {/* Content */}
            <div className="p-8">
              <div className="flex justify-center mb-4">
                <Image
                  src="/images/logo.png"
                  alt="Rax Tech"
                  width={120}
                  height={40}
                  className="h-10 w-auto"
                />
              </div>
              <h3 className="text-2xl font-bold mb-2 text-center">
                Send us a message
              </h3>
              <p className="text-muted-foreground text-center mb-6">
                Fill out the form below and we&apos;ll get back to you shortly.
              </p>

              <form className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="modal-name">Name</Label>
                    <Input id="modal-name" placeholder="Your name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="modal-email">Email</Label>
                    <Input
                      id="modal-email"
                      type="email"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="modal-phone">Phone (optional)</Label>
                    <PhoneInput id="modal-phone" placeholder="98765 43210" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="modal-company">Company (optional)</Label>
                    <Input id="modal-company" placeholder="Your Company" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="modal-message">Message</Label>
                  <Textarea
                    id="modal-message"
                    placeholder="Tell us about your project..."
                    rows={4}
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-accent hover:bg-accent/90 text-white"
                  size="lg"
                >
                  Send Message
                  <Send className="ml-2 h-5 w-5" />
                </Button>
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
