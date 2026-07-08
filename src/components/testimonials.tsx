import type { TestimonialItem } from "../types";
import { CardGrid } from "./common/CardGrid";

interface Props {
  data?: TestimonialItem[];
}

export const Testimonials = ({ data }: Props) => (
  <div id="testimonials">
    <div className="ai-testimonials-container">
      <div className="section-title">
        <span className="ai-section-label">Client Results</span>
        <h2>What Our Clients Say</h2>
      </div>
      <CardGrid minCardWidth="280px" gap="26px">
        {data
          ? data.map((t, i) => (
              <div key={`${t.name}-${i}`} className="ai-testimonial-card">
                <div className="ai-testimonial-header">
                  {/* {t?.img
                    ? <img className="ai-testimonial-img" src={t.img} alt="" loading="lazy" /> */}
                    <i className="fa fa-solod fa-person ai-testimonial-img"></i>
                  {/* } */}
                  <div>
                    <div className="ai-testimonial-name">{t.name ? t.name : 'Anonymous'}</div>
                    <div className="ai-testimonial-program">{t.program}</div>
                  </div>
                </div>
                <p className="ai-testimonial-text">{t.text}</p>
                <p className="ai-testimonial-result">
                  <i className="fa-solid fa-arrow-trend-up" aria-hidden="true" /> {t.result}
                </p>
              </div>
            ))
          : null}
      </CardGrid>
    </div>
  </div>
);
