import { notFound } from 'next/navigation';
import { getTranslation } from '@/i18n';

import { getProject } from '@/actions/getProjects';
import {
  OG_CONTENT_TYPE,
  OG_SIZE,
  renderOgImage,
  truncate,
} from '@/lib/og-image';

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
