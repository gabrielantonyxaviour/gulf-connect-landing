import {
  Hero,
  Statistics,
  AboutPreview,
  Domains,
  Services,
  Industries,
  Testimonials,
  ContactCTA,
} from "@/components/sections";

const showTestimonials = process.env.SHOW_TESTIMONIALS_SECTION === "true";

export default async function Home() {
  return (
    <>
      <Hero />
      <Statistics />
      <AboutPreview />
      <Domains />
      <Services />
      <Industries />
      {showTestimonials && <Testimonials />}
      <ContactCTA />
    </>
  );
}
