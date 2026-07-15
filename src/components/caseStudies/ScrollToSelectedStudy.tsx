"use client";

import { useEffect } from "react";

// Selecting a case study is a real navigation to /case-studies/[slug], so the
// detail block below the list isn't in the DOM yet at native-scroll time.
// Retry the scroll-into-view once this segment mounts (matches the old
// slug-keyed scrollIntoView behavior from the pre-Next.js implementation).
export const ScrollToSelectedStudy = ({ slug }: { slug?: string }) => {
  useEffect(() => {
    if (!slug) return;
    const timer = window.setTimeout(() => {
      document.getElementById("cs-detail-section")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
    return () => window.clearTimeout(timer);
  }, [slug]);

  return null;
};
