import type { ProgramItem } from "../types";
import { CardGrid } from "./common/CardGrid";
import { CTA } from "./common/CTA";

interface Props {
  data?: ProgramItem[];
}

export const Programs = ({ data }: Props) => (
  <div id="programs">
    <div className="ai-programs-container">
      <div className="section-title">
        <span className="ai-section-label">Coaching Programs</span>
        <h2>Find Your Program</h2>
        <p className="ai-section-desc">
          Every program is built around you — your goals, your schedule and your starting point.
        </p>
      </div>
      <CardGrid minCardWidth="300px" gap="26px">
        {data
          ? data.map((program) => (
              <div
                key={program.id}
                className={`ai-program-card${program.featured ? " ai-program-card-featured" : ""}`}
              >
                {program.featured && <span className="ai-program-badge">Featured Program</span>}
                <div className="ai-service-icon-box" aria-hidden="true">
                  <i className={program.icon} />
                </div>
                <h3>{program.title}</h3>
                <p className="ai-program-description">{program.description}</p>
                <div className="ai-program-meta">
                  <span><i className="fa-solid fa-user" aria-hidden="true" /> {program.audience}</span>
                  <span><i className="fa-solid fa-clock" aria-hidden="true" /> {program.duration}</span>
                </div>
                <ul className="ai-benefits-list ai-program-features">
                  {program.features.map((feature, i) => (
                    <li key={i}>
                      <span className="ai-check" aria-hidden="true">
                        <i className="fa-solid fa-check" />
                      </span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <div className="ai-program-footer">
                  <span className="ai-program-price">Starting at ${program.startingPrice}</span>
                  <CTA href="https://calendly.com/elkenojones/30min" label={program.ctaLabel} variant="primary" />
                </div>
              </div>
            ))
          : null}
      </CardGrid>
    </div>
  </div>
);
