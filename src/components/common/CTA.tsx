interface CTAProps {
  href: string;
  label: string;
  variant?: 'primary' | 'secondary';
  onClick?: () => void;
}

export const CTA = ({ href, label, variant = 'primary', onClick }: CTAProps) => (
  <a href={href} className={`ai-hero-btn-${variant}`} onClick={onClick}>
    {label}
  </a>
);
