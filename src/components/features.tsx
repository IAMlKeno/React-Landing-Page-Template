import type { FeatureItem } from "../types";
import { CardGrid } from "./common/CardGrid";
import { FeatureCard } from "./common/FeatureCard";

interface Props {
  data?: FeatureItem[];
}

export const Features = ({ data }: Props) => (
  <div id="features">
    <div className="ai-features-container">
      <div className="ai-features-header section-title">
        <span className="ai-section-label">Why Choose Coaching</span>
        <h2>More Than Personal Training</h2>
        <span className="ai-section-divider" aria-hidden="true" />
      </div>
      <CardGrid minCardWidth="220px" gap="40px 28px">
        {data
          ? data.map((d, i) => (
              <FeatureCard key={`${d.title}-${i}`} icon={d.icon} title={d.title} text={d.text} />
            ))
          : null}
      </CardGrid>
    </div>
  </div>
);
