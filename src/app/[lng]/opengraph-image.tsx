import { APP_DESCRIPTION } from '@/constants';
import { getTranslation } from '@/i18n';

import { WithLanguageParams } from '@/@types/i18n.types';
import {
  OG_CONTENT_TYPE,
  OG_SIZE,
  renderOgImage,
  truncate,
} from '@/lib/og-image';

export const alt = 'Yan Lucas — Software Engineer';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

const Image = async ({ params }: WithLanguageParams) => {
  const { lng } = await params;
  const { t } = await getTranslation(lng);

  return renderOgImage({
    eyebrow: t('software_engineer'),
    title: 'Yan Lucas',
    description: truncate(t(APP_DESCRIPTION), 150),
  });
};

export default Image;
