import type { Metadata } from "next";
import { AboutHero } from "./components/about-hero";
import { VisionMission } from "./components/vision-mission";
import { Timeline } from "./components/timeline";
import { Stats } from "./components/stats";
import { SEO } from "@/lib/constants";

export const metadata: Metadata = {
  title: SEO.about.title,
  description: SEO.about.description,
};

const showJourney = process.env.SHOW_JOURNEY_SECTION === "true";

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <VisionMission />
      <Stats />
      {showJourney && <Timeline />}
    </>
  );
}
