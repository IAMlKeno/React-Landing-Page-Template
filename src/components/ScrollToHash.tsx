"use client";

import { useEffect } from "react";

// Cross-route links (e.g. from /case-studies) land here via a real navigation
// with a #hash. The browser tries to scroll to it before React has rendered
// the target element, so that native scroll silently no-ops — retry it
// ourselves once mounted.
export const ScrollToHash = () => {
  useEffect(() => {
    const hash = window.location.hash;
    if (!hash) return;
    const id = hash.slice(1);
    const timer = window.setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
    return () => window.clearTimeout(timer);
  }, []);

  return null;
};
