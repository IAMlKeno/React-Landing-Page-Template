import type { SocialLinks } from "../types";

interface Props {
  data?: { links: SocialLinks[] };
}

export const Footer = ({ data }: Props) => (
  <footer id="footer">
    <div className="ai-footer-inner">
      <p>&copy; 2026 Avanti Insieme Consulting. All rights reserved.</p>
      {data?.links && (
        <div className="ai-social-links">
          {data.links.map((social: SocialLinks, idx: number) => (
            <a
              key={social.link + "_" + idx}
              href={social.link}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.icon.replace("fa-", "")}
            >
              <i className={`fa-brands ${social.icon}`} aria-hidden="true" />
            </a>
          ))}
        </div>
      )}
    </div>
  </footer>
);
