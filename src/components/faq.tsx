import type { FaqItem } from "../types";

interface Props {
  data?: FaqItem[];
}

export const FAQ = ({ data }: Props) => (
  <div id="faq">
    <div className="ai-faq-container">
      <div className="section-title">
        <span className="ai-section-label">FAQ</span>
        <h2>Frequently Asked Questions</h2>
      </div>
      <div className="ai-faq-list">
        {data
          ? data.map((item, i) => (
              <details key={i} className="ai-faq-item">
                <summary className="ai-faq-question">
                  {item.question}
                  <i className="fa-solid fa-chevron-down ai-faq-chevron" aria-hidden="true" />
                </summary>
                <p className="ai-faq-answer">{item.answer}</p>
              </details>
            ))
          : null}
      </div>
    </div>
  </div>
);
