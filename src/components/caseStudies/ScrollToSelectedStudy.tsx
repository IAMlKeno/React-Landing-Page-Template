"use client";

import { useEffect } from "react";

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
