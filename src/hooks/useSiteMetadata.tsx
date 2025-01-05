import {graphql, useStaticQuery} from 'gatsby';

import {MetadataType} from '@/utils';

export const useSiteMetadata = () => {
  const data = useStaticQuery<MetadataType>(graphql`
    query {
      site {
        siteMetadata {
          author
          title
          image
          siteUrl
          social {
            name
            url
          }
          en {
            title
            description
            keywords
          }
          br {
            title
            description
            keywords
          }
        }
      }
    }
  `);

  return data.site.siteMetadata;
};
