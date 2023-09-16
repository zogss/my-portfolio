import { HeadProps } from 'gatsby'
import React from 'react'
import { useSiteMetadata } from '~/hooks/useSiteMetadata'

interface SeoProps extends HeadProps<any, any> {
  description?: string
  meta?: any[]
  title: string
}

const Seo: React.FC<SeoProps> = ({ description, title, pageContext }) => {
  //* hooks
  const metaData = useSiteMetadata()

  //* constants
  const metaDescription = description || metaData.description

  const lang = pageContext.language === 'br' ? 'pt-BR' : 'en-US'

  //* render
  return (
    <>
      <html lang={lang} />
      <title>{title}</title>
      <link rel="canonical" href={metaData.siteUrl} />
      <link rel="alternate" hrefLang="pt-BR" href={metaData.siteUrl} />
      <link rel="alternate" hrefLang="en-US" href={`${metaData.siteUrl}en/`} />
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
    </>
  )
}

export default Seo
