import { Navbar } from "@/components/landing/navbar";
import { Hero } from "@/components/landing/hero";
import { About } from "@/components/landing/about";
import { Pain } from "@/components/landing/pain";
import { Features } from "@/components/landing/features";
import { HowItWorks } from "@/components/landing/how-it-works";
import { Pricing } from "@/components/landing/pricing";
import { Objections } from "@/components/landing/objections";
import { Faq } from "@/components/landing/faq";
import { FinalCta } from "@/components/landing/final-cta";
import { Footer } from "@/components/landing/footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="overflow-x-clip">
        <Hero />
        <About />
        <Pain />
        <Features />
        <HowItWorks />
        <Pricing />
        <Objections />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
