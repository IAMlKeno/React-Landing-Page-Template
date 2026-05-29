import { useState, useEffect } from "react";
import { Navigation } from "./components/navigation";
import { Header } from "./components/header";
import { Features } from "./components/features";
import { About } from "./components/about";
import { Services } from "./components/services";
import { Gallery } from "./components/gallery";
import { Testimonials } from "./components/testimonials";
import { Team } from "./components/Team";
import { Contact } from "./components/contact";
import JsonData from "./data/data.json";
import SmoothScroll from "smooth-scroll";
import type { LandingPageData } from "./types";
import "./App.css";
import ProductList from "./features/cart/components/ProductList";
import { form, FormProgressTest } from "./components/FormProgressTest";

export const scroll = new SmoothScroll('a[href*="#"]', {
  speed: 1000,
  speedAsDuration: true,
});

const App = () => {
  const [landingPageData, setLandingPageData] = useState<LandingPageData | null>(null);
  useEffect(() => {
    setLandingPageData(JsonData as LandingPageData);
  }, []);

  return (
    <div>
      <Navigation />
      <Header data={landingPageData?.Header} />
      <FormProgressTest props={form} />
      <ProductList />
      <Features data={landingPageData?.Features} />
      <About data={landingPageData?.About} />
      <Services data={landingPageData?.Services} />
      <Gallery data={landingPageData?.Gallery} />
      <Testimonials data={landingPageData?.Testimonials} />
      <Team data={landingPageData?.Team} />
      <Contact data={landingPageData?.Contact} />
    </div>
  );
};

export default App;
