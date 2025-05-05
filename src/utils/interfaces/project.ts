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

export type ProjectType = {
  id: string;
  slug: ProjectSlugType;
  title: ProjectNameType;
  subtitle: string;
  short_description: string;
  long_description: string[];
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
