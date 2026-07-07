import type { StatItem } from "../../types";

interface Props {
  data?: StatItem[];
}

export const Stats = ({ data }: Props) => {
  if (!data || data.length === 0) return null;

  return (
    <div className="ai-stats-row" aria-label="Coaching highlights">
      {data.map((stat, i) => (
        <div key={`${stat.label}-${i}`} className="ai-stat-chip">
          <span className="ai-stat-chip-icon" aria-hidden="true">
            <i className={stat.icon} />
          </span>
          <span className="ai-stat-chip-label">{stat.label}</span>
        </div>
      ))}
    </div>
  );
};
