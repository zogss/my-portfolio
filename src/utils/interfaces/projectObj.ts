export type ProjectNameType =
  | 'Spacie'
  | 'CS Analytics'
  | 'Expert Stats'
  | 'Chirp'
  | 'Massagueirinha Menu'
  | 'Bull Blockchain'

export type ProjectObjType = {
  title: ProjectNameType
  description: string
  url: string | null
  repository_url: string | null
  alt: string
  techs: string[]
}
