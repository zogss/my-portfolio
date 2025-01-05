export type MetadataLanguageObjectType = {
  title: string;
  description: string;
  keywords: string[];
};

export type MetadataType = {
  site: {
    siteMetadata: {
      author: string;
      title: string;
      image: string;
      siteUrl: string;
      social: {
        name: string;
        url: string;
      }[];
      br: MetadataLanguageObjectType;
      en: MetadataLanguageObjectType;
    };
  };
};
