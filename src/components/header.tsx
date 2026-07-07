import type { HeaderData, StatItem } from "../types";
import { CTA } from "./common/CTA";
import { Stats } from "./common/Stats";

interface Props {
  data?: HeaderData;
  stats?: StatItem[];
}

export const Header = ({ data, stats }: Props) => {
  const bgStyle = data?.hero?.image
    ? {
        background: `linear-gradient(rgba(17,37,65,0.8), rgba(17,37,65,0.9)), url(${data.hero.image}) center/cover no-repeat`,
      }
    : { background: "rgba(17,37,65,0.9)" };

  return (
    <header id="header">
      <div className="intro" style={bgStyle}>
        <div className="ai-overlay">
          <div className="ai-hero-content">
            <span className="ai-hero-badge">{data?.badge ?? "Strength Coaching in Prince Edward Island"}</span>
            <h1>
              {(data?.title ?? "Build Strength.\nGain Confidence.").split("\n").map((line, i, arr) => (
                <span key={i}>
                  {line}
                  {i < arr.length - 1 && <br />}
                </span>
              ))}
            </h1>
            <p>{data ? data.paragraph : ""}</p>
            <div className="ai-hero-btns">
              <CTA href="#contact" label="Start Your Strength Journey" variant="primary" />
              <CTA href="#programs" label="View Programs" variant="secondary" />
            </div>
            <p><small><strong>Free 20-minute consultation • No obligation</strong></small></p>
          </div>
        </div>
      </div>
      <Stats data={stats} />
    </header>
  );
};
