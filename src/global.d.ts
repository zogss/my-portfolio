declare module 'gatsby-plugin-firebase-v9.0' {
  import {type FirebaseApp} from 'firebase/app';

  const app: FirebaseApp;
  export default app;
}

// TODO: Remove this when the following issue is resolved!
declare module 'gatsby-plugin-react-i18next' {
  import * as Gatsby18n from 'gatsby-plugin-react-i18next/dist';
  import {GatsbyLinkProps} from 'gatsby';

  export declare const Link = Gatsby18n.Link as React.ForwardRefExoticComponent<
    GatsbyLinkProps & {
      language?: string;
    } & React.RefAttributes<HTMLAnchorElement>
  >;

  export * from 'gatsby-plugin-react-i18next/dist';
}

declare interface I18nPageData {
  locales: I18nLocales;
}

declare interface I18nLocales {
  edges: I18nEdge[];
}

declare interface I18nEdge {
  node: I18nNode;
}

declare interface I18nNode {
  ns: string;
  data: string;
  language: string;
}

declare interface I18nPageContext {
  language: string;
  i18n: I18nPageContextData;
}

declare interface I18nPageContextData {
  language: string;
  languages: string[];
  defaultLanguage: string;
  generateDefaultLanguagePage: boolean;
  routed: boolean;
  originalPath: string;
  path: string;
}
