import React from 'react'
import { useSiteMetadata } from '~/hooks/useSiteMetadata'

interface SeoProps {
  description?: string
  lang?: string
  meta?: any[]
  title: string
}

const Seo: React.FC<SeoProps> = ({ description, title }) => {
  //* hooks
  const metaData = useSiteMetadata()

  //* constants
  const metaDescription = description || metaData.description

  //* render
  return (
    <>
      <title>{title}</title>
      <meta name="description" content={metaDescription} />
      <meta name="keywords" content={metaData.keywords.join(', ')} />
      <meta name="robots" content="index, follow" />
      <meta name="og:type" content="website" />
      <meta name="og:card" content="summary_large_image" />
      <meta name="og:url" content={metaData.siteUrl} />
      <meta name="og:title" content={metaData.title} />
      <meta name="og:description" content={metaDescription} />
      <meta name="og:image" content={metaData.siteUrl + metaData.image} />
      <meta name="og:creator" content={metaData.author} />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={metaData.title} />
      <meta name="twitter:creator" content={metaData.author} />
      <meta name="twitter:image" content={metaData.siteUrl + metaData.image} />
      <meta name="twitter:description" content={metaDescription} />
      <link rel="canonical" href={metaData.siteUrl} />
      <link rel="alternate" hrefLang="en" href={`${metaData.siteUrl}en/`} />
      <link rel="alternate" hrefLang="pt" href={metaData.siteUrl} />
    </>
  )
}

export default Seo
