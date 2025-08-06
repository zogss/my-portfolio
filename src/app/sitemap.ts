import { MetadataRoute } from 'next';

import { env } from '@env';
import { languages } from '@/i18n/settings';

import projectsData from '../../public/projects.json';

const sitemap = async (): Promise<MetadataRoute.Sitemap> => {
  const baseUrl = env.APP_URL;
  const currentDate = new Date();

  const routes: MetadataRoute.Sitemap = [];

  // Add root redirect (redirects to default language)
  routes.push({
    url: baseUrl,
    lastModified: currentDate,
    changeFrequency: 'weekly',
    priority: 1,
  });

  // Add localized home pages
  languages.forEach((lang) => {
    routes.push({
      url: `${baseUrl}/${lang}`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    });
  });

  // Add localized projects listing pages
  languages.forEach((lang) => {
    routes.push({
      url: `${baseUrl}/${lang}/projects`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    });
  });

  // Add individual project pages for each language
  languages.forEach((lang) => {
    projectsData.forEach((project) => {
      routes.push({
        url: `${baseUrl}/${lang}/projects/${project.slug}`,
        lastModified: currentDate,
        changeFrequency: 'monthly',
        priority: 0.7,
      });
    });
  });

  return routes;
};

export default sitemap;
