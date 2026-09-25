import { Capabilities } from "@/features/capabilities/ui/Capabilities";
import { Contact } from "@/features/contact/ui/Contact";
import { Faq } from "@/features/faq/ui/Faq";
import { Footer } from "@/features/footer/ui/Footer";
import { Hero } from "@/features/hero/ui/Hero";
import { Metrics } from "@/features/metrics/ui/Metrics";
import { Navigation } from "@/features/navigation/ui/Navigation";
import { Process } from "@/features/process/ui/Process";
import { Signal } from "@/features/signal/ui/Signal";
import { Stack } from "@/features/stack/ui/Stack";
import { Work } from "@/features/work/ui/Work";

export default function Home() {
  return (
    <>
      <Navigation />
      <main>
        <Hero />
        <Signal />
        <Capabilities />
        <Stack />
        <Work />
        <Process />
        <Metrics />
        <Faq />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
