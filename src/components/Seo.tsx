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
      <meta property="og:type" content="website" />
      <meta property="og:url" content={metaData.siteUrl} />
      <meta property="og:title" content={metaData.title} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:image" content="../images/yan_icon.png" />
      <meta property="og:creator" content={metaData.author} />
      <meta property="twitter:title" content={metaData.title} />
      <meta property="twitter:card" content="summary" />
      <meta property="twitter:creator" content={metaData.author} />
      <meta property="twitter:description" content={metaDescription} />
      <link rel="alternate" hrefLang="en" href={`${metaData}en/`} />
      <link rel="alternate" hrefLang="pt" href={metaData.siteUrl} />
      <link rel="icon" href="../images/yan_icon.png" />
    </>
  )
}

export default Seo
