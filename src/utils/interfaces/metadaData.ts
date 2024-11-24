export type MetadataType = {
  site: {
    siteMetadata: {
      author: string;
      title: string;
      image: string;
      siteUrl: string;
      description: string;
      keywords: string[];
      social: {
        name: string;
        url: string;
      }[];
    };
  };
};
