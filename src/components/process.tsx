import type { ProcessStep } from "../types";
import { CardGrid } from "./common/CardGrid";

interface Props {
  data?: ProcessStep[];
}

export const Process = ({ data }: Props) => (
  <div id="process">
    <div className="ai-process-container">
      <div className="section-title">
        <span className="ai-section-label">How It Works</span>
        <h2>Your Coaching Process</h2>
      </div>
      <CardGrid minCardWidth="220px" gap="28px">
        {data
          ? data.map((step) => (
              <div key={step.step} className="ai-process-card">
                <span className="ai-process-step-num" aria-hidden="true">{step.step}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </div>
            ))
          : null}
      </CardGrid>
    </div>
  </div>
);
