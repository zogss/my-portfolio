export const environments = {
  personal: {
    email: process.env.GATSBY_PERSONAL_EMAIL,
    location: process.env.GATSBY_PERSONAL_LOCATION,
    githubUrl: process.env.GATSBY_PERSONAL_GITHUB_URL,
    linkedinUrl: process.env.GATSBY_PERSONAL_LINKEDIN_URL,
    instagramUrl: process.env.GATSBY_PERSONAL_INSTAGRAM_URL,
  },
  website: {
    siteUrl: process.env.GATSBY_SITE_URL,
  },
  inspiration: {
    figmaUrl: process.env.GATSBY_INSPIRATION_FIGMA_URL,
  },
};
