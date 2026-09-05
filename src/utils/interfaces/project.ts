export type ProjectNameType =
  | 'Spacie'
  | 'CS Analytics'
  | 'Expert Stats'
  | 'Chirp'
  | 'Massagueirinha Menu'
  | 'Bull Blockchain'
  | 'Car Rent'
  | 'Localize';

export type ProjectSlugType =
  | 'spacie'
  | 'cs-analytics'
  | 'expert-stats'
  | 'chirp'
  | 'massagueirinha-menu'
  | 'bull-blockchain'
  | 'car-rent'
  | 'localize';

/**
 * Problem / approach / outcome narrative for a project. Values are translation
 * keys, like the rest of the project copy. Optional: projects without one fall
 * back to the plain description.
 */
export type ProjectCaseStudyType = {
  problem: string;
  approach: string;
  outcome: string;
};

export type ProjectType = {
  id: string;
  slug: ProjectSlugType;
  title: ProjectNameType;
  subtitle: string;
  short_description: string;
  long_description: string[];
  case_study?: ProjectCaseStudyType;
  url: string | null;
  repository_url: string | null;
  techs: string[];
  image: string;
  carousel: { image: string }[] | null;
  alt: string;
};

export interface ProjectsQueryType {
  content: {
    nodes: ProjectType[];
  };
}
