import { getTranslation } from '@/i18n';

import { WithLanguageParams } from '@/@types/i18n.types';
import { getProjects } from '@/actions/getProjects';
import {
  OG_CONTENT_TYPE,
  OG_SIZE,
  renderOgImage,
  truncate,
} from '@/lib/og-image';
import { languages } from '@/i18n/settings';

// Drawn once per locale at build time and served as a static file, instead of
// being rendered by a function every time a crawler fetches the card. Any
// other locale 404s.
export const dynamicParams = false;

export const generateStaticParams = () => languages.map((lng) => ({ lng }));

export const alt = 'Yan Lucas — Projects';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

const Image = async ({ params }: WithLanguageParams) => {
  const { lng } = await params;
  const { t } = await getTranslation(lng);
  const projects = await getProjects();

  return renderOgImage({
    eyebrow: t('projects'),
    title: t('projects_page_title'),
    description: truncate(t('projects_page_description'), 150),
    tags: projects.slice(0, 4).map((project) => project.title),
  });
};

export default Image;
