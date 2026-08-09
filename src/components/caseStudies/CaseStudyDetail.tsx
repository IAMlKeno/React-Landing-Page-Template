import type { CaseStudy } from "@/types";

interface Props {
  study: CaseStudy | null;
}

const getParagraphs = (body: CaseStudy["body"]): string[] =>
  Array.isArray(body) ? body : body.split(/\n\n+/);

export const CaseStudyDetail = ({ study }: Props) => {
  if (!study) return null;

  return (
    <div id="cs-detail-section" className="ai-cs-detail">
      <div className="ai-cs-detail-content">
        <span className="ai-section-label">{study.tag}</span>
        <h2>{study.title}</h2>
        <p className="ai-cs-detail-client">{study.client}</p>

        <div className="ai-cs-detail-body">
          {getParagraphs(study.body).map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>

        {study.results.length > 0 && (
          <div className="ai-cs-results">
            {study.results.map((result, i) => (
              <div key={i} className="ai-cs-result">
                <span className="ai-cs-result-stat">{result.stat}</span>
                <span className="ai-cs-result-label">{result.label}</span>
              </div>
            ))}
          </div>
        )}

        <a href={`/?project=${study.slug}#contact`} className="ai-cs-detail-cta">
          Start a Project Like This
        </a>
      </div>
    </div>
  );
};
