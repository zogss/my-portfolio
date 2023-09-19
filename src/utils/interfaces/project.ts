import { type IGatsbyImageData } from 'gatsby-plugin-image'

export type ProjectNameType =
  | 'Spacie'
  | 'CS Analytics'
  | 'Expert Stats'
  | 'Chirp'
  | 'Massagueirinha Menu'
  | 'Bull Blockchain'

export type ProjectSlugType =
  | 'spacie'
  | 'cs-analytics'
  | 'expert-stats'
  | 'chirp'
  | 'massagueirinha-menu'
  | 'bull-blockchain'

export type ProjectType = {
  id: string
  slug: ProjectSlugType
  title: ProjectNameType
  subtitle: string
  description: string
  url: string | null
  repository_url: string | null
  techs: string[]
  image: {
    base: string
    childImageSharp: {
      gatsbyImageData: IGatsbyImageData
    }
  }
  alt: string
}

export interface ProjectsQueryType {
  content: {
    nodes: ProjectType[]
  }
}
