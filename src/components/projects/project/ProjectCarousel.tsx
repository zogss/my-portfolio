'use client';

import React, { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import { cn } from '@/utils';
import Autoplay from 'embla-carousel-autoplay';
import { useReducedMotion } from 'motion/react';

import { useTranslation } from '@/i18n/client';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '@/components/ui/carousel';

interface ProjectCarouselProps {
  images: { image: string }[];
  /** Already-translated alt text for the project. */
  alt: string;
}

const AUTOPLAY_DELAY = 5000;

/**
 * Image gallery for a project page.
 *
 * Falls back to a plain image when there is only one slide, so a single-image
 * project does not render controls that cannot go anywhere.
 */
const ProjectCarousel: React.FC<ProjectCarouselProps> = ({ images, alt }) => {
  const { t } = useTranslation();
  const shouldReduceMotion = useReducedMotion();

  // Lazy state, not a ref: the plugin instance has to be read during render to
  // be handed to the carousel, and reading a ref there is exactly what
  // react-hooks/refs forbids. useState gives the same create-once stability.
  const [autoplay] = useState(() =>
    Autoplay({ delay: AUTOPLAY_DELAY, stopOnInteraction: true }),
  );
  const [api, setApi] = useState<CarouselApi>();
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    if (!api) return;

    const onSelect = () => setSelected(api.selectedScrollSnap());
    onSelect();
    api.on('select', onSelect);
    api.on('reInit', onSelect);

    return () => {
      api.off('select', onSelect);
      api.off('reInit', onSelect);
    };
  }, [api]);

  const scrollTo = useCallback((index: number) => api?.scrollTo(index), [api]);

  if (images.length <= 1) {
    const only = images[0];
    if (!only) return null;

    return (
      <div className="aspect-video w-full overflow-hidden rounded-md bg-neutral-950">
        <Image
          src={only.image}
          alt={alt}
          priority
          quality={85}
          width={1600}
          height={900}
          className="size-full"
        />
      </div>
    );
  }

  return (
    <Carousel
      setApi={setApi}
      // Autoplay is motion the visitor did not ask for, so honour the OS
      // setting by not registering the plugin at all. Calling `stop()` after
      // the fact is not enough: images finishing loading make embla reInit,
      // and the plugin restarts itself on reInit.
      plugins={shouldReduceMotion ? [] : [autoplay]}
      opts={{ loop: true }}
      aria-label={alt}
      className="w-full"
      onMouseEnter={() => autoplay.stop()}
      onMouseLeave={() => {
        if (!shouldReduceMotion) autoplay.play();
      }}
    >
      <CarouselContent>
        {images.map(({ image }, index) => (
          <CarouselItem key={image}>
            <div className="aspect-video w-full overflow-hidden rounded-md bg-neutral-950">
              <Image
                src={image}
                // Only the first slide is above the fold; the rest would
                // otherwise all compete for priority on load.
                priority={index === 0}
                loading={index === 0 ? undefined : 'lazy'}
                alt={t('project_slide_alt', {
                  alt,
                  current: index + 1,
                  total: images.length,
                })}
                quality={85}
                width={1600}
                height={900}
                className="size-full"
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>

      <CarouselPrevious className="-left-px hidden h-16 w-10 rounded-l-none rounded-r border-l-0 border-neutral-400/90 text-neutral-100 opacity-50 transition-opacity duration-300 hover:bg-zinc-900/90 hover:opacity-100 focus-visible:opacity-100 md:inline-flex" />
      <CarouselNext className="-right-px hidden h-16 w-10 rounded-l rounded-r-none border-r-0 border-neutral-400/90 text-neutral-100 opacity-50 transition-opacity duration-300 hover:bg-zinc-900/90 hover:opacity-100 focus-visible:opacity-100 md:inline-flex" />

      <div className="mt-3 flex items-center justify-center gap-2">
        {images.map(({ image }, index) => (
          <button
            key={`dot-${image}`}
            type="button"
            onClick={() => scrollTo(index)}
            aria-label={t('go_to_slide', { current: index + 1 })}
            aria-current={index === selected}
            className={cn(
              'h-1.5 cursor-pointer rounded-full transition-all duration-300 focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:outline-none',
              index === selected
                ? 'w-6 bg-neutral-100'
                : 'w-1.5 bg-neutral-100/30 hover:bg-neutral-100/60',
            )}
          />
        ))}
        <span className="sr-only" aria-live="polite">
          {t('project_slide_alt', {
            alt,
            current: selected + 1,
            total: images.length,
          })}
        </span>
      </div>
    </Carousel>
  );
};

export default ProjectCarousel;
