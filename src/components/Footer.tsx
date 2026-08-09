import type { ContactData, SocialLinks } from "../types";
import JsonData from "../data/data.json";

interface Props {
  data?: ContactData;
}

export const Footer = ({ data }: Props) => (
  <footer id="footer">
    <div className="ai-footer-inner">
      <p>
        &copy; {new Date().getFullYear()} {JsonData.Navigation.logo.value}. All rights reserved.
      </p>
      {data?.social && (
        <div className="ai-social-links">
          {data.social.links.map((social: SocialLinks, idx: number) => (
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
