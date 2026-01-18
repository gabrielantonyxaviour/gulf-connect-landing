"use client";

import { useState } from "react";
import { Globe } from "@/components/ui/globe";
import { OfficeCards } from "./office-cards";

export function GlobalOffices() {
  const [selectedOfficeId, setSelectedOfficeId] = useState<string | null>("headquarters");

  return (
    <section className="py-10 sm:py-12 md:py-16 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-3 sm:mb-4">
            Our <span className="text-accent">Worldwide</span> Offices
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            With offices spanning across Asia and Europe, we&apos;re positioned to serve
            clients globally with local expertise and round-the-clock support.
          </p>
        </div>

        {/* Globe and Cards Layout */}
        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center mb-8 sm:mb-10 md:mb-12">
          {/* Globe */}
          <div className="order-2 lg:order-1">
            <Globe
              selectedOfficeId={selectedOfficeId}
              onMarkerClick={setSelectedOfficeId}
            />
          </div>

          {/* Selected Office Highlight */}
          <div className="order-1 lg:order-2 space-y-6">
            <div className="p-4 sm:p-5 md:p-6 rounded-2xl bg-card border border-border">
              <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">
                Connected Across Continents
              </h3>
              <div className="space-y-3 sm:space-y-4 text-muted-foreground">
                <p>
                  Our strategic presence in <span className="text-foreground font-medium">India</span>,{" "}
                  <span className="text-foreground font-medium">Oman</span>, and the{" "}
                  <span className="text-foreground font-medium">Poland</span> enables us to deliver
                  seamless solutions across time zones.
                </p>
                <p>
                  Each office brings unique regional expertise while maintaining
                  our unified commitment to innovation and quality.
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-3 sm:gap-4 mt-4 pt-4 sm:mt-5 sm:pt-5 md:mt-6 md:pt-6 border-t border-border">
                <div className="text-center">
                  <div className="text-xl sm:text-2xl font-bold text-accent">3</div>
                  <div className="text-[10px] sm:text-xs text-muted-foreground">Countries</div>
                </div>
                <div className="text-center">
                  <div className="text-xl sm:text-2xl font-bold text-accent">2</div>
                  <div className="text-[10px] sm:text-xs text-muted-foreground">Continents</div>
                </div>
                <div className="text-center">
                  <div className="text-xl sm:text-2xl font-bold text-accent">24/7</div>
                  <div className="text-[10px] sm:text-xs text-muted-foreground">Coverage</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Office Cards */}
        <OfficeCards
          selectedOfficeId={selectedOfficeId}
          onOfficeSelect={setSelectedOfficeId}
        />
      </div>
    </section>
  );
}
