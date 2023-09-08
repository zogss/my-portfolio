/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import { graphql, useStaticQuery } from 'gatsby'
import React, { useMemo } from 'react'
import { MetadataType } from '~/utils'

interface SeoProps {
  description?: string
  lang?: string
  meta?: any[]
  title: string
}

const Seo: React.FC<SeoProps> = ({ description, title }) => {
  //* hooks
  const { site } = useStaticQuery<MetadataType>(graphql`
    query {
      site {
        siteMetadata {
          title
          description
          author
        }
      }
    }
  `)

  //* memos
  const metaData = useMemo(() => site.siteMetadata, [site.siteMetadata])

  const metaDescription = useMemo(
    () => description || metaData.description,
    [description, metaData.description]
  )

  //* render
  return (
    <>
      <title>{title}</title>
      <meta name="description" content={metaDescription} />
      <meta
        name="keywords"
        content="Yan Lucas, Yan, Lucas, Yan Lucas software engineer, Yan Lucas engenheiro de software, Yan Lucas frontend developer, Yan Lucas front-end developer, Yan Lucas desenvolvedor de frontend, Yan Lucas desenvolvedor de front-end, web development, desenvolvimento web, software engineer, engenheiro de software, frontent, front-end, front end, frontEnd, frontend developer, front-end developer, front end developer, frontEnd developer, desenvolvedor de frontend, desenvolvedor de front-end, desenvolvedor front end, desenvolvedor front-end, desenvolvedor frontend, desenvolvedor frontEnd, des"
      />
      <meta name="robots" content="index, follow" />
      <link rel="alternate" hrefLang="en" href={`${metaData}en/`} />
      <link rel="alternate" hrefLang="pt" href={metaData.siteUrl} />
      <meta property="og:title" content={metaData.title} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content="../images/yan_icon.png" />
      <meta property="twitter:title" content={metaData.title} />
      <meta property="twitter:card" content="summary" />
      <meta property="twitter:creator" content={site.siteMetadata.author} />
      <meta property="twitter:description" content={metaDescription} />
    </>
  )
}

export default Seo
