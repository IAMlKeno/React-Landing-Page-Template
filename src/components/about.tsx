import type { AboutData } from "../types";

interface Props {
  data?: AboutData;
}

export const About = ({ data }: Props) => (
  <div id="about">
    <div className="ai-about-grid">
      <div className="ai-about-img-wrap">
        <div className="ai-about-img-box">
          <img
            src={data?.image?.src ?? "/img/swc/coach-portrait.jpg"}
            alt={data?.image?.alt ?? "Coach coaching a client through a squat"}
            loading="lazy"
          />
        </div>
        <div className="ai-stat-badge" aria-hidden="true">
          <div className="ai-stat-num">PEI</div>
          <div className="ai-stat-text">strength coaching, built around you</div>
        </div>
      </div>

      <div className="ai-about-content">
        <span className="ai-section-label">About the Coach</span>
        <h2>{data?.whyHeader ?? "Why Train With Me"}</h2>
        <p className="about-paragraph">{data?.paragraph ?? ""}</p>
        {data?.listOfWhys && (
          <ul className="ai-benefits-list">
            {data.listOfWhys.flat().map((why, i) => (
              <li key={i}>
                <span className="ai-check" aria-hidden="true">
                  <i className="fa-solid fa-check" />
                </span>
                <span>{why}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  </div>
);
