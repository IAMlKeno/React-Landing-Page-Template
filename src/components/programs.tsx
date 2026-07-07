import type { ServiceItem } from "../types";
import { CardGrid } from "./common/CardGrid";

interface Props {
  data?: ServiceItem[];
}

export const Services = ({ data }: Props) => (
  <div id="services">
    <div className="ai-services-container">
      <div className="section-title">
        <span className="ai-section-label">What We Do</span>
        <h2>Our Services</h2>
        <p className="ai-section-desc">
          Six disciplines, one partner. We cover every layer of your technology stack so you never
          have to juggle multiple vendors.
        </p>
      </div>
      <CardGrid minCardWidth="300px" gap="26px">
        {data
          ? data.map((d, i) => (
              <div key={`${d.name}-${i}`} className="ai-service-card">
                <div className="ai-service-icon-box" aria-hidden="true">
                  <i className={d.icon} />
                </div>
                <h3>{d.name}</h3>
                <p>{d.text}</p>
              </div>
            ))
          : null}
      </CardGrid>
    </div>
  </div>
);
