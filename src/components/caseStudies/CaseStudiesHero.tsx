import type { CaseStudy } from "../../types";

interface Props {
  selected: CaseStudy | null;
  onBack: () => void;
}

export const CaseStudiesHero = ({ selected, onBack }: Props) => (
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
        <button type="button" className="ai-cs-back-btn" onClick={onBack}>
          <i className="fa-solid fa-arrow-left" aria-hidden="true" /> Back to All Case Studies
        </button>
      )}
    </div>
  </section>
);
