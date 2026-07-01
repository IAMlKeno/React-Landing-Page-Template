import { useState, useEffect } from "react";
import { Navigation } from "./components/nav/navigation";
import { Header } from "./components/header";
import { Features } from "./components/features";
import { About } from "./components/about";
import { Contact } from "./components/contact";
import JsonData from "./data/data.json";
import type { LandingPageData } from "./types";
import "./App.css";
import { Services } from "./components/services";

const App = () => {
  const [landingPageData, setLandingPageData] = useState<LandingPageData | null>(null);
  useEffect(() => {
    setLandingPageData(JsonData as LandingPageData);
  }, []);

  return (
    <div>
      <Navigation />
      <Header data={landingPageData?.Header} />
      <Features data={landingPageData?.Features} />
      <Services data={landingPageData?.Services} />
      <About data={landingPageData?.About} />
      <Contact data={landingPageData?.Contact} />
    </div>
  );
};

export default App;
