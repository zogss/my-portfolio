import { MetadataType } from '@/utils';
import { graphql, useStaticQuery } from 'gatsby';

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
