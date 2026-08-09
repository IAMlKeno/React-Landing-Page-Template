import type { Metadata } from "next";
import { Navigation } from "@/components/nav/navigation";
import { Footer } from "@/components/Footer";
import JsonData from "@/data/data.json";
import type { LandingPageData } from "@/types";
import "./globals.css";

const landingPageData = JsonData as LandingPageData;

export const metadata: Metadata = {
  metadataBase: new URL("https://www.squatwithconfidence.ca"),
  title: "Squat with Confidence | Strength Coaching in Prince Edward Island",
  description:
    "Personalized strength coaching for beginners, busy professionals and aspiring powerlifters. Book a free consultation with a certified personal trainer serving Prince Edward Island.",
  keywords:
    "Personal Trainer PEI, Strength Coach PEI, Powerlifting Coach PEI, Squat Coaching PEI, Beginner Strength Training PEI, Cornwall PEI",
  authors: [{ name: "Squat with Confidence" }],
  robots: "index, follow",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    title: "Squat with Confidence | Build Strength. Gain Confidence.",
    description:
      "Personalized strength coaching for beginners, busy professionals and aspiring powerlifters in Prince Edward Island.",
    url: "https://www.squatwithconfidence.ca/",
    images: ["/img/swc/og-image.png"],
    siteName: "Squat with Confidence",
    locale: "en_CA",
  },
  twitter: {
    card: "summary_large_image",
    title: "Squat with Confidence | Build Strength. Gain Confidence.",
    description:
      "Personalized strength coaching for beginners, busy professionals and aspiring powerlifters.",
    images: ["/img/swc/og-image.png"],
  },
  icons: {
    apple: "/img/swc/favicon/apple-touch-icon.png",
    icon: [
      { url: "/img/swc/favicon/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/img/swc/favicon/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
  },
  manifest: "/img/swc/favicon/site.webmanifest",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ExerciseGym",
  name: "Squat with Confidence",
  description:
    "Personalized strength coaching for beginners, busy professionals and aspiring powerlifters, serving Prince Edward Island.",
  url: "https://www.squatwithconfidence.ca",
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
  sameAs: [
    "https://www.facebook.com/profile.php?id=61561318454214",
    "https://www.instagram.com/avanti.insieme.network/",
  ],
  serviceType: [
    "Squat with Confidence",
    "Bench with Confidence",
    "Beginner Powerlifting",
    "Strength for Busy Professionals",
    "Six Week Strength Transformation",
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" type="text/css" href="/css/bootstrap.css" />
        <link rel="stylesheet" type="text/css" href="/css/style.css" />
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
      <body id="page-top" data-spy="scroll" data-target=".navbar-fixed-top">
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <Navigation />
        {children}
        <Footer data={landingPageData.Contact} />
      </body>
    </html>
  );
}
