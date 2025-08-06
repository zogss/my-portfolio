'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ProjectType } from '@/utils';
import { track } from '@vercel/analytics';
// import Autoplay from 'embla-carousel-autoplay';
import { BiLinkExternal } from 'react-icons/bi';
import { BsGithub } from 'react-icons/bs';

import { TRACK_EVENT_KEYS } from '@/lib/track-event-keys';
import { useTranslation } from '@/i18n/client';
// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
//   CarouselNext,
//   CarouselPrevious,
// } from '@/components/ui/carousel';
import Tag from '@/components/Tag';
import ProjectSeparator from '@/components/variants/projectSeparator';
import ProjectTitleText from '@/components/variants/projectTitleText';
import ProjectTripleDots from '@/components/variants/projectTripleDots';

const ProjectBlock: React.FC<ProjectType> = ({
  title,
  short_description,
  long_description,
  image,
  // carousel,
  alt,
  slug,
  techs,
  url,
  repository_url,
}) => {
  const { t } = useTranslation();

  // const plugin = useRef(Autoplay({ delay: 5000, stopOnInteraction: true }));

  return (
    <section className="flex w-full flex-col gap-9">
      <div className="flex w-full flex-col items-start gap-3 md:gap-4">
        {/* {carousel && carousel.length > 0 ? (
          <Carousel
            plugins={[plugin.current]}
            opts={{ loop: true }}
            className="size-full overflow-hidden"
            onMouseEnter={plugin.current.stop}
            onMouseLeave={plugin.current.reset}
          >
            <CarouselContent>
              {[...carousel, ...carousel].map(({ image }, index) => (
                <CarouselItem key={`${image}-${index}`}>
                  <div className="aspect-[16/9] w-full overflow-hidden rounded-md bg-neutral-950">
                    <Image
                      src={image}
                      alt={t(alt)}
                      priority
                      quality={100}
                      width={1600}
                      height={900}
                      className="size-full"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="-left-px h-16 w-10 rounded-l-none rounded-r border-l-0 border-neutral-400/90 text-neutral-100 opacity-50 transition-[opacity,background-color,color,border-color,text-decoration-color,fill,stroke] duration-300 hover:bg-zinc-900/90 hover:opacity-100" />
            <CarouselNext className="-right-px h-16 w-10 rounded-l rounded-r-none border-r-0 border-neutral-400/90 text-neutral-100 opacity-50 transition-[opacity,background-color,color,border-color,text-decoration-color,fill,stroke] duration-300 hover:bg-zinc-900/90 hover:opacity-100" />
          </Carousel>
        ) : (
        )} */}
        <div className="aspect-[16/9] w-full overflow-hidden rounded-md bg-neutral-950">
          <Image
            src={image}
            alt={t(alt)}
            priority
            quality={100}
            width={1600}
            height={900}
            className="size-full"
          />
        </div>
        <div className="flex w-full flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div className="group/projectCard flex w-full justify-between gap-4 sm:w-fit">
            <ProjectTitleText
              as={url ? 'a' : 'span'}
              {...(url
                ? {
                    href: url,
                    target: '_blank',
                    rel: 'noopener noreferrer',
                    title: url,
                  }
                : {})}
              color={slug}
              className="w-fit"
            >
              {t(title)}
            </ProjectTitleText>
            <ProjectTripleDots
              color={slug}
              size="md"
              className="xs:flex hidden items-center"
            />
          </div>
          {(url || repository_url) && (
            <div className="flex items-center justify-start gap-1 md:gap-2">
              {url && (
                <Link
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={url}
                  onClick={() => {
                    track(TRACK_EVENT_KEYS.PROJECT_VISIT_CLICK, {
                      url,
                    });
                  }}
                  className="flex w-full items-center justify-center rounded-md p-1 text-sm font-semibold transition-colors duration-500 hover:bg-white/10 hover:text-white focus:outline-none md:gap-2 md:p-2 lg:gap-2.5 lg:p-2.5"
                >
                  <span className="sr-only">{t('visit')}</span>
                  <BiLinkExternal className="size-5 shrink-0 md:size-6" />
                </Link>
              )}
              {repository_url && (
                <Link
                  href={repository_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={repository_url}
                  onClick={() => {
                    track(TRACK_EVENT_KEYS.PROJECT_CODE_CLICK, {
                      url: repository_url,
                    });
                  }}
                  className="flex w-full items-center justify-center rounded-md p-1 text-sm font-semibold transition-colors duration-500 hover:bg-white/10 hover:text-white focus:outline-none md:gap-2 md:p-2 lg:gap-2.5 lg:p-2.5"
                >
                  <span className="sr-only">{t('code')}</span>
                  <BsGithub className="w-h-5 md:6 shmd:rink-0 h-6 w-5" />
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
      <div className="w-full text-sm md:text-base">
        <span>{t(short_description)}</span>
        {long_description.map((paragraph, i) => (
          <p key={`${title}-paragraph-${i}`} className="mt-3">
            {t(paragraph)}
          </p>
        ))}
      </div>
      <div className="mt-5 flex w-full flex-col items-start gap-3">
        <div className="flex w-full items-end justify-start gap-2">
          <span className="text-sm font-semibold text-neutral-400">
            {t('techs')}
          </span>
          <ProjectSeparator color={slug} size="xs" />
        </div>
        <div className="flex w-full flex-wrap items-center justify-center gap-1.5">
          {techs.map((tech, i) => (
            <Tag key={`${title}-${tech}-${i}`} text={tech} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectBlock;
