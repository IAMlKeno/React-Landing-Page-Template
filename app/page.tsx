import { Header } from "@/components/header";
import { Features } from "@/components/features";
import { Programs } from "@/components/programs";
import { Process } from "@/components/process";
import { About } from "@/components/about";
import { Testimonials } from "@/components/testimonials";
import { FAQ } from "@/components/faq";
import { FinalCTA } from "@/components/final-cta";
import { Contact } from "@/components/contact";
import { ScrollToHash } from "@/components/ScrollToHash";
import JsonData from "@/data/data.json";
import type { LandingPageData } from "@/types";

const landingPageData = JsonData as LandingPageData;

export default function Home() {
  return (
    <div id="main-content">
      <ScrollToHash />
      <Header data={landingPageData.Header} stats={landingPageData.Stats} />
      <Features data={landingPageData.Features} />
      <Programs data={landingPageData.Programs} />
      <Process data={landingPageData.CoachingProcess} />
      <About data={landingPageData.About} />
      <Testimonials data={landingPageData.Testimonials} />
      <FAQ data={landingPageData.FAQ} />
      <FinalCTA data={landingPageData.FinalCTA} />
      <Contact data={landingPageData.Contact} />
    </div>
  );
}
