import type { Metadata } from "next";
import { Navigation } from "@/components/nav/navigation";
import { Footer } from "@/components/footer";
import { Providers } from "@/components/Providers";
import JsonData from "@/data/data.json";
import type { LandingPageData } from "@/types";
import "./globals.css";

const data = JsonData as LandingPageData;

export const metadata: Metadata = {
  metadataBase: new URL("https://www.avantiinsieme.ca"),
  title: "Avanti Insieme Consulting | IT Solutions & Digital Transformation",
  description:
    "Avanti Insieme Consulting delivers end-to-end IT services: web development, eCommerce, hardware installation, CMS, CRM, and AI solutions that grow with your business.",
  keywords:
    "IT consulting, web development, eCommerce customization, CMS, CRM, AI solutions, hardware installation, digital transformation, Cornwall PEI",
  authors: [{ name: "Avanti Insieme Consulting" }],
  robots: "index, follow",
  alternates: {
    canonical: "https://www.avantiinsieme.ca/",
  },
  openGraph: {
    type: "website",
    title: "Avanti Insieme Consulting | Where Digital Meets Human",
    description:
      "End-to-end IT solutions bridging digital, hardware, and human expertise. We grow with you.",
    url: "https://www.avantiinsieme.ca/",
    images: ["https://www.avantiinsieme.ca/img/avanti/og-image.jpg"],
    siteName: "Avanti Insieme Consulting",
    locale: "en_CA",
  },
  twitter: {
    card: "summary_large_image",
    title: "Avanti Insieme Consulting | Where Digital Meets Human",
    description: "IT consulting that bridges digital, hardware, and human expertise.",
    images: ["https://www.avantiinsieme.ca/img/avanti/og-image.jpg"],
  },
  icons: {
    apple: "/img/avanti/favicon/apple-touch-icon.png",
    icon: [
      { url: "/img/avanti/favicon/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/img/avanti/favicon/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
  },
  manifest: "/img/avanti/favicon/site.webmanifest",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Avanti Insieme Consulting",
  description:
    "End-to-end IT consulting bridging digital, hardware, and human expertise — growing with your business.",
  url: "https://www.avantiinsieme.ca",
  telephone: "+19023947518",
  email: "elkenojones@gmail.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "17 Heatherway Dr.",
    addressLocality: "Cornwall",
    addressRegion: "PE",
    postalCode: "C0A 1H3",
    addressCountry: "CA",
  },
  sameAs: ["https://facebook.com", "https://instagram.com"],
  serviceType: [
    "Web Development",
    "eCommerce Customization",
    "Hardware Installation",
    "CMS Implementation",
    "CRM Development",
    "AI Solutions",
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" type="text/css" href="/css/bootstrap.css" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;600;700;800&family=Inter:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/7.0.1/css/all.min.css"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body id="page-top">
        <a href="#main" className="skip-link">
          Skip to main content
        </a>
        <Providers>
          <Navigation />
          {children}
          <Footer data={data.Contact?.social} />
        </Providers>
      </body>
    </html>
  );
}
