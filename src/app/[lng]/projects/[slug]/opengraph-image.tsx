import { notFound } from 'next/navigation';
import { getTranslation } from '@/i18n';

import { getProject, getProjects } from '@/actions/getProjects';
import {
  OG_CONTENT_TYPE,
  OG_SIZE,
  renderOgImage,
  truncate,
} from '@/lib/og-image';
import { languages } from '@/i18n/settings';

// Drawn once per locale and project at build time and served as a static file,
// instead of being rendered by a function every time a crawler fetches the
// card. Any other locale or slug 404s.
export const dynamicParams = false;

export const generateStaticParams = async () => {
  const projects = await getProjects();
  return languages.flatMap((lng) =>
    projects.map((project) => ({ lng, slug: project.slug })),
  );
};

export const alt = 'Yan Lucas — Project';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

interface ProjectImageProps {
  params: Promise<{ lng: string; slug: string }>;
}

const Image = async ({ params }: ProjectImageProps) => {
  const { lng, slug } = await params;
  const project = await getProject(slug);

  if (!project) {
    notFound();
  }

  const { t } = await getTranslation(lng);

  return renderOgImage({
    eyebrow: t('projects'),
    title: project.title,
    description: truncate(t(project.short_description), 150),
    tags: project.techs.slice(0, 4),
  });
};

export default Image;
