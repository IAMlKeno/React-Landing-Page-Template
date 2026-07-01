import type { HeaderData } from "../types";
import { CTA } from "./common/CTA";

interface Props {
  data?: HeaderData;
}

export const Header = ({ data }: Props) => {
  const bgStyle = data?.hero?.image
    ? {
        background: `linear-gradient(rgba(17,37,65,0.72), rgba(17,37,65,0.84)), url(${data.hero.image}) center/cover no-repeat`,
      }
    : { background: "rgba(17,37,65,0.9)" };

  return (
    <header id="header">
      <div className="intro" style={bgStyle}>
        <div className="ai-overlay">
          <div className="ai-hero-content">
            <span className="ai-hero-badge">Moving Forward Together</span>
            <h1>{data ? data.title : "Where Digital Meets Human"}</h1>
            <p>{data ? data.paragraph : ""}</p>
            <div className="ai-hero-btns">
              <CTA href="#services" label="Our Services" variant="primary" />
              <CTA href="#about" label="Learn About Us" variant="secondary" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
