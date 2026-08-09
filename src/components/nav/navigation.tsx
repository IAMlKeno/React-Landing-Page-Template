"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import JsonData from "../../data/data.json";
import { NavigationData, NavigationItemsData } from "../../types";

// Same-page anchors (#contact, #programs, ...) only resolve on the route that
// actually contains that element — usually just "/". From any other route,
// prefix with "/" so the browser navigates home before scrolling.
const isAnchor = (href: string) => href.startsWith("#");

export const Navigation = () => {
  const data: NavigationData = JsonData.Navigation;
  const pathname = usePathname();
  // Initialize to desktop (matches server-rendered output, which has no window);
  // corrected client-side in the effect below after hydration.
  const [isMobile, setIsMobile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 859.98px)");
    const handler = (e: MediaQueryListEvent) => {
      setIsMobile(e.matches);
      if (!e.matches) setMenuOpen(false);
    };
    setIsMobile(mq.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  const anchorHref = (href: string) => (pathname === "/" ? href : `/${href}`);

  const renderNavItem = (item: NavigationItemsData, className: string, onClick?: () => void) =>
    isAnchor(item.href) ? (
      <a key={item.href} href={anchorHref(item.href)} className={className} onClick={onClick}>
        {item.label}
      </a>
    ) : (
      <Link key={item.href} href={item.href} className={className} onClick={onClick}>
        {item.label}
      </Link>
    );

  return (
    <header id="ai-header" aria-label="Site header">
      <nav className="ai-nav" aria-label="Primary">
        <a href={anchorHref("#page-top")} className="ai-logo" onClick={closeMenu}>
          <span className="ai-logo-badge" aria-hidden="true">
            <img src="/img/swc/logo.png" width={30} />
          </span>
          <span className="ai-logo-text">{data.logo.value}</span>
        </a>

        {!isMobile && (
          <div className="ai-nav-desktop">
            {data.items.map((item: NavigationItemsData) => renderNavItem(item, "ai-nav-link"))}
            <a href={anchorHref("#contact")} className="ai-nav-cta">
              Start Your Strength Journey
            </a>
          </div>
        )}

        {isMobile && (
          <button
            className="ai-hamburger"
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
            aria-controls="ai-mobile-menu"
            onClick={() => setMenuOpen((o) => !o)}
          >
            <i className={menuOpen ? "fa-solid fa-xmark" : "fa-solid fa-bars"} aria-hidden="true" />
          </button>
        )}
      </nav>

      {isMobile && menuOpen && (
        <div id="ai-mobile-menu" className="ai-mobile-panel">
          {data.items.map((item: NavigationItemsData) => renderNavItem(item, "", closeMenu))}
          <a href={anchorHref("#contact")} className="ai-mobile-cta" onClick={closeMenu}>
            Start Your Strength Journey
          </a>
        </div>
      )}
    </header>
  );
};
