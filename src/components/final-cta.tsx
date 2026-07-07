import type { FinalCtaData } from "../types";
import { CTA } from "./common/CTA";

interface Props {
  data?: FinalCtaData;
}

export const FinalCTA = ({ data }: Props) => (
  <div id="final-cta">
    <div className="ai-final-cta-container">
      <h2>{data?.headline ?? "Ready to Become Stronger?"}</h2>
      <p>{data?.text ?? "Book your free consultation today and start building strength with confidence."}</p>
      <CTA
        href={data?.ctaHref ?? "#contact"}
        label={data?.ctaLabel ?? "Book Free Consultation"}
        variant="primary"
      />
    </div>
  </div>
);
