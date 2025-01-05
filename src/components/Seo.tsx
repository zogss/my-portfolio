import React from 'react';
import {HeadProps} from 'gatsby';

import {PageContextType} from '@/utils';
import {useSiteMetadata} from '@/hooks/useSiteMetadata';

interface SeoProps extends HeadProps<unknown, PageContextType> {
  title?: string;
  description?: string;
  pathname?: string;
  image?: string;
  imageAlt?: string;
  metaOgType?: string;
  metaTitle?: string;
}

const Seo: React.FC<SeoProps> = ({
  title,
  description,
  pathname,
  image,
  imageAlt,
  metaOgType,
  metaTitle,
  pageContext,
}) => {
  const metaData = useSiteMetadata();

  const lang = pageContext.language === 'br' ? 'pt-BR' : 'en';

  const translatedMetaData =
    pageContext.language === 'br' ? metaData.br : metaData.en;

  const translatedSiteUrl =
    pageContext.language === 'br'
      ? `${metaData.siteUrl}`
      : `${metaData.siteUrl}/en`;

  const pageTitle = title || metaData.title;
  const metaDescription = description || translatedMetaData.description;
  const metaUrl = pathname
    ? `${translatedSiteUrl}/${pathname}`
    : translatedSiteUrl;
  const metaImage = image
    ? metaData.siteUrl + image
    : metaData.siteUrl + metaData.image;
  const metaImageAlt = imageAlt || translatedMetaData.title;
  const metaOgTypeValue = metaOgType || 'website';
  const metaTitleValue = metaTitle || translatedMetaData.title;

  return (
    <>
      <html lang={lang} />
      <title>{pageTitle}</title>
      <link rel="canonical" href={metaUrl} />
      <link
        rel="alternate"
        hrefLang="pt-BR"
        href={`${metaData.siteUrl}/${pathname}`}
      />
      <link
        rel="alternate"
        hrefLang="en"
        href={`${metaData.siteUrl}/en/${pathname}`}
      />
      <meta name="description" content={metaDescription} />
      <meta name="robots" content="index, follow" />
      <meta name="image" content={metaImage} />
      <meta property="description" content={metaDescription} />
      <meta
        property="keywords"
        content={translatedMetaData.keywords.join(', ')}
      />
      <meta property="robots" content="index, follow" />
      <meta property="og:url" content={metaUrl} />
      <meta property="og:type" content={metaOgTypeValue} />
      <meta property="og:image" content={metaImage} />
      <meta property="og:image:alt" content={metaImageAlt} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:card" content="summary_large_image" />
      <meta property="og:title" content={metaTitleValue} />
      <meta property="og:creator" content={metaData.author} />
      <meta property="og:locale" content={lang} />
      <meta property="og:site_name" content={metaData.title} />
      <meta property="twitter:url" content={metaUrl} />
      <meta property="twitter:description" content={metaDescription} />
      <meta property="twitter:image" content={metaImage} />
      <meta property="twitter:image:alt" content={metaImageAlt} />
      <meta property="twitter:card" content="summary" />
      <meta property="twitter:title" content={metaTitleValue} />
      <meta property="twitter:creator" content={metaData.author} />
      {pageContext.language === 'br' && (
        <meta name="googlebot" content="notranslate" />
      )}
    </>
  );
};

export default Seo;
