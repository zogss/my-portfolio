import { graphql, useStaticQuery } from 'gatsby'
import { MetadataType } from '~/utils'

export const useSiteMetadata = () => {
  //* hooks
  const data = useStaticQuery<MetadataType>(graphql`
    query {
      site {
        siteMetadata {
          title
          author
          image
          siteUrl
          description
          keywords
          social {
            name
            url
          }
        }
      }
    }
  `)

  //* return
  return data.site.siteMetadata
}
