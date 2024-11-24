import React from 'react';
import {HeadProps} from 'gatsby';

import {PageContextType} from '@/utils';
import {useSiteMetadata} from '@/hooks/useSiteMetadata';

interface SeoProps extends HeadProps<unknown, PageContextType> {
  description?: string;
  title: string;
}

const Seo: React.FC<SeoProps> = ({description, title, pageContext}) => {
  const metaData = useSiteMetadata();

  const metaDescription = description || metaData.description;

  const lang = pageContext.language === 'br' ? 'pt-BR' : 'en-US';

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
  );
};

export default Seo;
