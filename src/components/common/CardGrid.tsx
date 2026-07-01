import React from "react";

interface CardGridProps {
  children: React.ReactNode;
  minCardWidth?: string;
  gap?: string;
  className?: string;
}

export const CardGrid = ({
  children,
  minCardWidth = "220px",
  gap = "28px",
  className = "",
}: CardGridProps) => (
  <div
    className={`ai-card-grid ${className}`.trim()}
    style={{
      gridTemplateColumns: `repeat(auto-fit, minmax(${minCardWidth}, 1fr))`,
      gap,
    }}
  >
    {children}
  </div>
);
