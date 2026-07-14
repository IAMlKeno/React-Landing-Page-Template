interface FeatureCardProps {
  icon: string;
  title: string;
  text: string;
}

export const FeatureCard = ({ icon, title, text }: FeatureCardProps) => (
  <div className="ai-feature-card">
    <div className="ai-feature-icon" aria-hidden="true">
      <i className={icon} />
    </div>
    <h3>{title}</h3>
    <p>{text}</p>
  </div>
);
