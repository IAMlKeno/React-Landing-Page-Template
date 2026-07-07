export interface HeaderData {
  title: string;
  paragraph: string;
  badge?: string;
  hero?: { image: string, };
}

export interface NavigationItemsData {
  href: string;
  className: Array<string>;
  label: string;
}
export interface NavigationLogo {
  type: string;
  value: string;
}
export interface NavigationData {
  items: Array<NavigationItemsData>;
  logo: NavigationLogo;
}

export interface StatItem {
  icon: string;
  label: string;
}

export interface AboutData {
  paragraph: string;
  whyHeader?: string;
  listOfWhys?: Array<string[]>;
  image?: {
    src: string;
    alt: string;
  };
}

export interface FeatureItem {
  icon: string;
  title: string;
  text: string;
}

export interface ProgramItem {
  id: string;
  icon: string;
  title: string;
  description: string;
  audience: string;
  duration: string;
  features: string[];
  startingPrice: number;
  featured?: boolean;
  ctaLabel: string;
}

export interface ProcessStep {
  step: number;
  title: string;
  text: string;
}

export interface TestimonialItem {
  img: string;
  text: string;
  name: string;
  program: string;
  result: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface FinalCtaData {
  headline: string;
  text: string;
  ctaLabel: string;
  ctaHref: string;
}

export interface ContactData {
  address: string;
  phone: string;
  email: string;
  social?: {
    links: SocialLinks[]
  }
}
export interface SocialLinks {
  link: string;
  icon: string;
}

export interface ProductImage {
  src: string;
  alt: string;
  height?: number;
  width?: number;
}

export interface ProductData {
  id: string;
  sku: string;
  name: string;
  description: string;
  icon?: string;
  price: number;
  image?: ProductImage;
  action: string;
  feedbackLink?: string;
}

export interface LandingPageData {
  SEO?: any;
  Navigation: NavigationData;
  Header: HeaderData;
  Stats: StatItem[];
  Features: FeatureItem[];
  Programs: ProgramItem[];
  CoachingProcess: ProcessStep[];
  About: AboutData;
  Testimonials: TestimonialItem[];
  FAQ: FaqItem[];
  FinalCTA: FinalCtaData;
  Contact: ContactData;
  Products: ProductData[];
}
