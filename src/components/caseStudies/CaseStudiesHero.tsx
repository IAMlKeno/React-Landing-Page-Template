import Link from "next/link";
import type { CaseStudy } from "../../types";

interface Props {
  selected: CaseStudy | null;
}

export const CaseStudiesHero = ({ selected }: Props) => (
  <section className="ai-cs-hero" aria-labelledby="cs-hero-h">
    <div className="ai-cs-hero-content">
      <span className="ai-hero-badge">
        {selected ? selected.tag : "Client Success Stories"}
      </span>
      <h1 id="cs-hero-h">{selected ? selected.title : "Case Studies"}</h1>
      <p>
        {selected
          ? selected.client
          : "Real projects, real outcomes. A look at how we've helped businesses bridge digital, hardware, and human expertise."}
      </p>
      {selected && (
        <Link href="/case-studies" className="ai-cs-back-btn">
          <i className="fa-solid fa-arrow-left" aria-hidden="true" /> Back to All Case Studies
        </Link>
      )}
    </div>
  </section>
);
