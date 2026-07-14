import { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { Navigation } from "./components/nav/navigation";
import { Header } from "./components/header";
import { Features } from "./components/features";
import { About } from "./components/about";
import { Contact } from "./components/contact";
import { CaseStudiesPage } from "./components/caseStudies";
import JsonData from "./data/data.json";
import type { LandingPageData } from "./types";
import "./App.css";
import { Services } from "./components/services";

const LandingPage = ({ data }: { data: LandingPageData | null }) => {
  const { hash } = useLocation();

  // Cross-route links (e.g. from /case-studies) land here via a full page
  // navigation with a #hash. The browser tries to scroll to it before React
  // has rendered the target element, so that native scroll silently no-ops —
  // retry it ourselves once mounted.
  useEffect(() => {
    if (!hash) return;
    const id = hash.slice(1);
    const timer = window.setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
    return () => window.clearTimeout(timer);
  }, [hash]);

  return (
    <div>
      <Navigation />
      <main id="main">
        <Header data={data?.Header} />
        <Features data={data?.Features} />
        <Services data={data?.Services} />
        <About data={data?.About} />
        <Contact data={data?.Contact} />
      </main>
    </div>
  );
};

const App = () => {
  const [landingPageData, setLandingPageData] = useState<LandingPageData | null>(null);
  useEffect(() => {
    setLandingPageData(JsonData as LandingPageData);
  }, []);

  return (
    <Routes>
      <Route path="/" element={<LandingPage data={landingPageData} />} />
      <Route path="/case-studies" element={<CaseStudiesPage />} />
      <Route path="/case-studies/:slug" element={<CaseStudiesPage />} />
    </Routes>
  );
};

export default App;
