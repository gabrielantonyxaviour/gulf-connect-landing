"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Mail, MapPin, Phone, Clock, Building2 } from "lucide-react";
import { SORTED_OFFICES } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface OfficeCardsProps {
  selectedOfficeId: string | null;
  onOfficeSelect: (officeId: string) => void;
}

function formatTime(timezone: string): string {
  try {
    return new Intl.DateTimeFormat("en-US", {
      timeZone: timezone,
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    }).format(new Date());
  } catch {
    return "--:--";
  }
}

export function OfficeCards({ selectedOfficeId, onOfficeSelect }: OfficeCardsProps) {
  const [currentTimes, setCurrentTimes] = useState<Record<string, string>>({});

  useEffect(() => {
    // Update times immediately
    const updateTimes = () => {
      const times: Record<string, string> = {};
      SORTED_OFFICES.forEach((office) => {
        times[office.id] = formatTime(office.timezone);
      });
      setCurrentTimes(times);
    };

    updateTimes();
    const interval = setInterval(updateTimes, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
      {SORTED_OFFICES.map((office) => {
        const isSelected = selectedOfficeId === office.id;
        const isHeadquarters = office.type === "Headquarters";

        return (
          <div
            key={office.id}
            onClick={() => onOfficeSelect(office.id)}
            className={cn(
              "group relative cursor-pointer rounded-2xl border bg-card p-4 sm:p-5 md:p-6 transition-all duration-300 hover:shadow-xl",
              isSelected
                ? "border-accent shadow-lg shadow-accent/10 ring-2 ring-accent/20"
                : "border-border hover:border-accent/50"
            )}
          >
            {/* HQ badge */}
            {isHeadquarters && (
              <div className="absolute -top-2.5 left-3 sm:-top-3 sm:left-4 px-2.5 py-0.5 sm:px-3 sm:py-1 bg-accent text-accent-foreground text-xs font-semibold rounded-full">
                HQ
              </div>
            )}

            {/* Logo */}
            <div
              className={cn(
                "w-full h-12 sm:h-14 md:h-16 rounded-lg flex items-center justify-center mb-3 sm:mb-4 overflow-hidden",
                office.id === "oman" || office.id === "europe" || office.id === "headquarters" ? "bg-white" : "bg-muted/50"
              )}
            >
              <Image
                src={office.logo}
                alt={office.name}
                width={office.id === "europe" ? 240 : office.id === "oman" ? 200 : 140}
                height={office.id === "europe" ? 100 : office.id === "oman" ? 80 : 50}
                className={cn(
                  "object-contain",
                  office.id === "europe" ? "max-h-[4.5rem]" : office.id === "oman" ? "max-h-16" : "max-h-12"
                )}
              />
            </div>

            {/* Company Name */}
            <h3 className="text-base sm:text-lg font-bold mb-1 group-hover:text-accent transition-colors">
              {office.name}
            </h3>

            {/* Location with local time */}
            <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground mb-3 sm:mb-4">
              <MapPin className="h-4 w-4 flex-shrink-0" />
              <span>
                {office.address.city}, {office.address.country}
              </span>
              <span className="ml-auto flex items-center gap-1 text-[10px] sm:text-xs">
                <Clock className="h-3 w-3" />
                {currentTimes[office.id] || "--:--"}
              </span>
            </div>

            {/* Divider */}
            <div className="h-px bg-border mb-3 sm:mb-4" />

            {/* Address */}
            <div className="space-y-2 sm:space-y-3 text-sm">
              <div className="flex items-start gap-2 sm:gap-3">
                <Building2 className="h-4 w-4 text-muted-foreground flex-shrink-0 mt-0.5" />
                <div className="text-muted-foreground">
                  {office.address.line1 && <p>{office.address.line1}</p>}
                  {office.address.line2 && <p>{office.address.line2}</p>}
                  {office.address.line3 && <p>{office.address.line3}</p>}
                  <p>
                    {office.address.city}
                    {office.address.state && `, ${office.address.state}`}
                    {office.address.pincode && ` - ${office.address.pincode}`}
                  </p>
                  <p>{office.address.country}</p>
                </div>
              </div>

              {/* Email */}
              <a
                href={`mailto:${office.email}`}
                onClick={(e) => e.stopPropagation()}
                className="flex items-center gap-2 sm:gap-3 text-muted-foreground hover:text-accent transition-colors"
              >
                <Mail className="h-4 w-4 flex-shrink-0" />
                <span>{office.email}</span>
              </a>

              {/* Phone (if available) */}
              {office.phone && (
                <a
                  href={`tel:${office.phone}`}
                  onClick={(e) => e.stopPropagation()}
                  className="flex items-center gap-2 sm:gap-3 text-muted-foreground hover:text-accent transition-colors"
                >
                  <Phone className="h-4 w-4 flex-shrink-0" />
                  <span>{office.phone}</span>
                </a>
              )}
            </div>

          </div>
        );
      })}
    </div>
  );
}
