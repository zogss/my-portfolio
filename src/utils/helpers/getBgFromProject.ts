import { ProjectSlugType } from '../interfaces'

export const getBgFromProject = (slug: ProjectSlugType) => {
  switch (slug) {
    case 'spacie':
      return 'hover:bg-spacie-rose bg-spacie-rose'
    case 'cs-analytics':
      return 'hover:bg-cs-blue bg-cs-blue'
    case 'expert-stats':
      return 'hover:bg-expert-dark bg-expert-dark'
    case 'chirp':
      return 'hover:bg-black bg-black'
    case 'massagueirinha-menu':
      return 'hover:bg-massgueirinha-orange bg-massgueirinha-orange'
    case 'bull-blockchain':
      return 'hover:bg-bull-blockchain-blue bg-bull-blockchain-blue'
    case 'car-rent':
      return 'hover:bg-car-rent-violet bg-car-rent-violet'
    case 'localize':
      return 'hover:bg-localize-blue bg-localize-blue'
    default:
      return ''
  }
}
