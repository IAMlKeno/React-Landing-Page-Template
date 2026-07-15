import { Suspense } from "react";
import { Header } from "@/components/header";
import { Features } from "@/components/features";
import { Services } from "@/components/services";
import { About } from "@/components/about";
import { Contact } from "@/components/contact";
import { ScrollToHash } from "@/components/ScrollToHash";
import JsonData from "@/data/data.json";
import type { LandingPageData } from "@/types";

const data = JsonData as LandingPageData;

export default function HomePage() {
  return (
    <main id="main">
      <ScrollToHash />
      <Header data={data.Header} />
      <Features data={data.Features} />
      <Services data={data.Services} />
      <About data={data.About} />
      <Suspense fallback={null}>
        <Contact data={data.Contact} />
      </Suspense>
    </main>
  );
}
