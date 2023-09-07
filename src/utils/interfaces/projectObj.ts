export type ProjectNameType =
  | 'Spacie'
  | 'CS Analytics'
  | 'Expert Stats'
  | 'Chirp'
  | 'Bull Blockchain'
  | 'Massagueirinha'

export type ProjectColorType = 'rose' | 'blue' | 'dark' | 'black'

export type ProjectObjType = {
  title: ProjectNameType
  description: string
  img: string
  alt: string
  color: ProjectColorType
  techs: string[]
}
