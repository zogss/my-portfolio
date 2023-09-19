declare module 'gatsby-plugin-firebase-v9.0' {
  import { type FirebaseApp } from 'firebase/app'

  const app: FirebaseApp
  export default app
}

declare interface I18nPageData {
  locales: I18nLocales
}

declare interface I18nLocales {
  edges: I18nEdge[]
}

declare interface I18nEdge {
  node: I18nNode
}

declare interface I18nNode {
  ns: string
  data: string
  language: string
}

declare interface I18nPageContext {
  language: string
  i18n: I18nPageContextData
}

declare interface I18nPageContextData {
  language: string
  languages: string[]
  defaultLanguage: string
  generateDefaultLanguagePage: boolean
  routed: boolean
  originalPath: string
  path: string
}
