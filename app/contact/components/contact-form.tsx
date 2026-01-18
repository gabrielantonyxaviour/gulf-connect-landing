"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Send, Loader2, CheckCircle } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { PhoneInput } from "@/components/ui/phone-input";
import { contactFormSchema, type ContactFormData } from "@/lib/validations";
import { trackFormSubmit } from "@/lib/analytics";

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [phoneValue, setPhoneValue] = useState("");
  const [countryCode, setCountryCode] = useState("+91");

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  });

  // Update form value when phone changes
  const handlePhoneChange = (value: string) => {
    setPhoneValue(value);
    setValue("phone", `${countryCode} ${value}`);
  };

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to send message");
      }

      setIsSuccess(true);
      reset();
      setPhoneValue("");
      trackFormSubmit("contact_form", true, { page: "contact" });

      // Reset success state after 5 seconds
      setTimeout(() => setIsSuccess(false), 5000);
    } catch (error) {
      trackFormSubmit("contact_form", false, {
        page: "contact",
        error: error instanceof Error ? error.message : "Unknown error"
      });
      toast.error(
        error instanceof Error ? error.message : "Failed to send message"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-background border border-accent/30 rounded-2xl p-5 sm:p-6 md:p-8 text-center shadow-lg"
      >
        <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
          <CheckCircle className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-accent" />
        </div>
        <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-2">
          Message Sent!
        </h3>
        <p className="text-muted-foreground">
          Thank you for reaching out. Our team will get back to you within 24
          hours.
        </p>
      </motion.div>
    );
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onSubmit={handleSubmit(onSubmit)}
      className="bg-background rounded-2xl p-4 sm:p-6 md:p-8 shadow-lg space-y-4 sm:space-y-5 md:space-y-6"
    >
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName">
            First Name <span className="text-accent">*</span>
          </Label>
          <Input
            id="firstName"
            placeholder="John"
            {...register("firstName")}
            className={errors.firstName ? "border-red-500" : ""}
          />
          {errors.firstName && (
            <p className="text-sm text-red-500">{errors.firstName.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="lastName">
            Last Name <span className="text-accent">*</span>
          </Label>
          <Input
            id="lastName"
            placeholder="Doe"
            {...register("lastName")}
            className={errors.lastName ? "border-red-500" : ""}
          />
          {errors.lastName && (
            <p className="text-sm text-red-500">{errors.lastName.message}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">
          Email <span className="text-accent">*</span>
        </Label>
        <Input
          id="email"
          type="email"
          placeholder="john@company.com"
          {...register("email")}
          className={errors.email ? "border-red-500" : ""}
        />
        {errors.email && (
          <p className="text-sm text-red-500">{errors.email.message}</p>
        )}
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="phone">Phone (optional)</Label>
          <PhoneInput
            id="phone"
            placeholder="98765 43210"
            value={phoneValue}
            onChange={handlePhoneChange}
            countryCode={countryCode}
            onCountryCodeChange={setCountryCode}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="company">Company (optional)</Label>
          <Input
            id="company"
            placeholder="Your Company"
            {...register("company")}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">
          Message <span className="text-accent">*</span>
        </Label>
        <Textarea
          id="message"
          placeholder="Tell us about your project or inquiry..."
          rows={5}
          {...register("message")}
          className={errors.message ? "border-red-500" : ""}
        />
        {errors.message && (
          <p className="text-sm text-red-500">{errors.message.message}</p>
        )}
      </div>

      <Button
        type="submit"
        size="lg"
        className="w-full bg-accent hover:bg-accent/90 text-white"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            Sending...
          </>
        ) : (
          <>
            Send Message
            <Send className="ml-2 h-5 w-5" />
          </>
        )}
      </Button>
    </motion.form>
  );
}
