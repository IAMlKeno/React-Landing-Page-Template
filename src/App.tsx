import { useState, useEffect } from "react";
import { Navigation } from "./components/nav/navigation";
import { Header } from "./components/header";
import { Features } from "./components/features";
import { Programs } from "./components/programs";
import { Process } from "./components/process";
import { About } from "./components/about";
import { Testimonials } from "./components/testimonials";
import { FAQ } from "./components/faq";
import { FinalCTA } from "./components/final-cta";
import { Contact } from "./components/contact";
import JsonData from "./data/data.json";
import type { LandingPageData } from "./types";

const App = () => {
  const [landingPageData, setLandingPageData] = useState<LandingPageData | null>(null);
  useEffect(() => {
    setLandingPageData(JsonData as LandingPageData);
  }, []);

  return (
    <div>
      <Navigation />
      <Header data={landingPageData?.Header} stats={landingPageData?.Stats} />
      <Features data={landingPageData?.Features} />
      <Programs data={landingPageData?.Programs} />
      <Process data={landingPageData?.CoachingProcess} />
      <About data={landingPageData?.About} />
      <Testimonials data={landingPageData?.Testimonials} />
      <FAQ data={landingPageData?.FAQ} />
      <FinalCTA data={landingPageData?.FinalCTA} />
      <Contact data={landingPageData?.Contact} />
    </div>
  );
};

export default App;
