import type { Metadata, Site, Socials } from "@types";

export const SITE: Site = {
  TITLE: "Pushkar Kurhekar",
  DESCRIPTION: "My personal website and portfolio.",
  EMAIL: "contact@pushkar.io",
  NUM_POSTS_ON_HOMEPAGE: 5,
  NUM_PROJECTS_ON_HOMEPAGE: 3,
};

export const HOME: Metadata = {
  TITLE: "Home",
  DESCRIPTION: "Homepage",
};

export const BLOG: Metadata = {
  TITLE: "Blog",
  DESCRIPTION: "Blog posts about various topics.",
};

export const PROJECTS: Metadata = {
  TITLE: "Projects",
  DESCRIPTION:
    "A collection of my projects with links to repositories and live demos.",
};

export const SOCIALS: Socials = [
  {
    NAME: "GitHub",
    HREF: "https://github.com/pshkrh",
  },
  {
    NAME: "LinkedIn",
    HREF: "https://www.linkedin.com/in/pshkrh",
  },
  {
    NAME: "Google Scholar",
    HREF: "https://scholar.google.com/citations?user=PmuJKvUAAAAJ&hl=en",
  }
];
