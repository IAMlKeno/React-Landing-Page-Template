"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import JsonData from "../../data/data.json";
import { NavigationData, NavigationItemsData } from "../../types";

export const Navigation = () => {
  const data: NavigationData = JsonData.Navigation;
  // Always initialize to false (matching what the server renders, since
  // window doesn't exist there) and correct it client-side in an effect —
  // reading window.innerWidth during the initial render would mismatch the
  // server-rendered HTML for any mobile visitor and break hydration.
  const [isMobile, setIsMobile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 859.98px)");
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => {
      setIsMobile(e.matches);
      if (!e.matches) setMenuOpen(false);
    };
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const closeMenu = () => setMenuOpen(false);
  const isRoute = (href: string) => href.startsWith("/");
  const isActive = (href: string) => isRoute(href) && pathname === href;
  // #services/#about/#contact only exist on "/" — from any other route they
  // need to be prefixed so the browser navigates there first.
  const anchorHref = (href: string) => (pathname === "/" ? href : `/${href}`);
  const contactHref = anchorHref("#contact");

  return (
    <header id="ai-header" aria-label="Site header">
      <nav className="ai-nav" aria-label="Primary">
        <Link href="/" className="ai-logo" onClick={closeMenu}>
          <span className="ai-logo-badge" aria-hidden="true">
            <img src="/img/avanti/avanti_logo_square_nobg.png" width={30}/>
          </span>
          <span className="ai-logo-text">{data.logo.value}</span>
        </Link>

        {!isMobile && (
          <div className="ai-nav-desktop">
            {data.items.map((item: NavigationItemsData) =>
              isRoute(item.href) ? (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`ai-nav-link${isActive(item.href) ? " is-active" : ""}`}
                  aria-current={isActive(item.href) ? "page" : undefined}
                >
                  {item.label}
                </Link>
              ) : (
                <a key={item.href} href={anchorHref(item.href)} className="ai-nav-link">
                  {item.label}
                </a>
              )
            )}
            <a href={contactHref} className="ai-nav-cta">Get a Free Consult</a>
          </div>
        )}

        {isMobile && (
          <button
            className="ai-hamburger"
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
            aria-controls="ai-mobile-menu"
            onClick={() => setMenuOpen(o => !o)}
          >
            <i className={menuOpen ? "fa-solid fa-xmark" : "fa-solid fa-bars"} aria-hidden="true" />
          </button>
        )}
      </nav>

      {isMobile && menuOpen && (
        <div id="ai-mobile-menu" className="ai-mobile-panel">
          {data.items.map((item: NavigationItemsData) =>
            isRoute(item.href) ? (
              <Link
                key={item.href}
                href={item.href}
                className={isActive(item.href) ? "is-active" : undefined}
                aria-current={isActive(item.href) ? "page" : undefined}
                onClick={closeMenu}
              >
                {item.label}
              </Link>
            ) : (
              <a key={item.href} href={anchorHref(item.href)} onClick={closeMenu}>
                {item.label}
              </a>
            )
          )}
          <a href={contactHref} className="ai-mobile-cta" onClick={closeMenu}>
            Get a Free Consult
          </a>
        </div>
      )}
    </header>
  );
};
