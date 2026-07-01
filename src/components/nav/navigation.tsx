import { useState, useEffect } from "react";
import JsonData from "../../data/data.json";
import { NavigationData, NavigationItemsData } from "../../types";

export const Navigation = () => {
  const data: NavigationData = JsonData.Navigation;
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 860);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 859.98px)");
    const handler = (e: MediaQueryListEvent) => {
      setIsMobile(e.matches);
      if (!e.matches) setMenuOpen(false);
    };
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header id="ai-header" aria-label="Site header">
      <nav className="ai-nav" aria-label="Primary">
        <a href="#page-top" className="ai-logo" onClick={closeMenu}>
          <span className="ai-logo-badge" aria-hidden="true">
            <img src="/img/avanti/avanti_logo_square_nobg.png" width={30}/>
          </span>
          <span className="ai-logo-text">{data.logo.value}</span>
        </a>

        {!isMobile && (
          <div className="ai-nav-desktop">
            {data.items.map((item: NavigationItemsData) => (
              <a key={item.href} href={item.href} className="ai-nav-link">
                {item.label}
              </a>
            ))}
            <a href="#contact" className="ai-nav-cta">Get a Free Consult</a>
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
          {data.items.map((item: NavigationItemsData) => (
            <a key={item.href} href={item.href} onClick={closeMenu}>
              {item.label}
            </a>
          ))}
          <a href="#contact" className="ai-mobile-cta" onClick={closeMenu}>
            Get a Free Consult
          </a>
        </div>
      )}
    </header>
  );
};
