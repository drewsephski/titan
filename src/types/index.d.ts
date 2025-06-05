export type SiteConfig = {
  links: string[];
  name: string;
  title: string;
  description: string;
  origin: string;
  og: string;
  keywords: string[];
  creator: {
    name: string;
    url: string;
  }
  socials: {
    github: string;
    x: string;
  }
}
