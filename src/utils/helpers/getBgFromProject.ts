export const getBgFromProject = (slug: string) => {
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
    default:
      return ''
  }
}
