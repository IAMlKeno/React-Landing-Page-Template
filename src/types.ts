export interface HeaderData {
  title: string;
  paragraph: string;
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

export interface AboutData {
  paragraph: string;
  whyHeader?: string;
  listOfWhys?: Array<string[]>;
}

export interface FeatureItem {
  icon: string;
  title: string;
  text: string;
}

export interface ServiceItem {
  icon: string;
  name: string;
  text: string;
}

export interface GalleryItem {
  title: string;
  largeImage: string;
  smallImage: string;
}

export interface TestimonialItem {
  img: string;
  text: string;
  name: string;
}

export interface TeamMember {
  img: string;
  name: string;
  job: string;
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

export interface CaseStudyResult {
  stat: string;
  label: string;
}

export interface CaseStudy {
  id: string;
  slug: string;
  tag: string;
  client: string;
  title: string;
  body: string;
  results: CaseStudyResult[];
}

export interface LandingPageData {
  SEO?: any;
  Header: HeaderData;
  About: AboutData;
  Features: FeatureItem[];
  Services: ServiceItem[];
  Gallery: GalleryItem[];
  Testimonials: TestimonialItem[];
  Team: TeamMember[];
  Contact: ContactData;
  CaseStudies: CaseStudy[];
}
