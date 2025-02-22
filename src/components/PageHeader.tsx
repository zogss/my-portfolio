import React, {Fragment} from 'react';
import {type PageProps} from 'gatsby';
import {GatsbyImage, getImage, type ImageDataLike} from 'gatsby-plugin-image';
import {Link, useI18next} from 'gatsby-plugin-react-i18next';
import {startCase} from 'lodash';

import {cn} from '@/utils';

interface PageHeaderProps {
  title: string;
  subtitle: string;
  image?: {
    src: ImageDataLike;
    alt: string;
  };
  location: PageProps['location'];
  hideOverlay?: boolean;
}

const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  subtitle,
  image,
  location,
  hideOverlay,
}) => {
  const {t} = useI18next();

  const paths = `/home${location.pathname.replace('/en', '')}`
    .split('/')
    .filter(path => path);

  return (
    <div className="relative flex h-64 w-full flex-col items-center justify-center py-10 md:h-80 md:py-16 lg:h-[28.75rem] lg:py-24">
      <div className="flex w-full flex-1 flex-col items-center justify-center gap-4">
        <div className="flex flex-col items-center justify-start gap-2.5 px-[5%] pt-6 lg:px-0">
          <h1 className="text-center text-4xl font-black tracking-[.08rem] sm:text-5xl md:text-[4rem]">
            {t(title)}
          </h1>
          <h2 className="text-center text-sm font-medium text-neutral-300 md:text-base lg:text-lg">
            {t(subtitle)}
          </h2>
        </div>
        <div className="flex items-center justify-center gap-2.5 text-center text-sm font-medium text-neutral-300 md:text-base lg:text-lg">
          {paths.map((path, i) => (
            <Fragment key={`path-${i}`}>
              {i < paths.length - 1 ? (
                <Link
                  to={`/${path === 'home' ? '' : path}`}
                  className="transition-colors hover:text-neutral-400 hover:underline">
                  {t(path)}
                </Link>
              ) : (
                <span>{startCase(t(path))}</span>
              )}
              {i !== paths.length - 1 && <span>/</span>}
            </Fragment>
          ))}
        </div>
      </div>
      {image && (
        <div className="absolute inset-0 z-[-3] bg-black/30">
          <GatsbyImage
            image={getImage(image.src)!}
            alt={image.alt}
            className="top-0 size-full object-cover object-center"
          />
        </div>
      )}
      {!hideOverlay && (
        <div
          className={cn(
            'absolute inset-0 z-[-1] flex items-center justify-center',
            {
              'bg-black/40': !hideOverlay,
            },
          )}>
          <div className="h-[56.25rem] w-[106.25rem] rounded-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-charcoal-black-700 via-transparent to-transparent" />
        </div>
      )}
      <div className="absolute inset-x-0 top-0 z-[-2] h-[4.5rem] bg-gradient-to-b from-charcoal-black-700 to-charcoal-black-700/20" />
      <div className="absolute inset-x-0 bottom-0 z-[-2] h-40 bg-gradient-to-t from-charcoal-black-700 via-charcoal-black-700/60 to-transparent" />
    </div>
  );
};

export default PageHeader;
