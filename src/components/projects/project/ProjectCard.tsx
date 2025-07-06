'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ProjectType } from '@/utils';

import { useTranslation } from '@/i18n/client';
import { AnimationContainer } from '@/components/animation-container';
import ProjectTripleDots from '@/components/variants/projectTripleDots';

const ProjectCard: React.FC<ProjectType> = ({
  image,
  alt,
  slug,
  title,
  short_description,
  techs,
  url,
}) => {
  const {
    t,
    i18n: { language },
  } = useTranslation();

  const cardRef = useRef<HTMLDivElement>(null);

  // 3D tilt effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (cardRef.current) {
        const rect = cardRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;

        cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
      }
    };

    const handleMouseLeave = () => {
      if (cardRef.current) {
        cardRef.current.style.transform =
          'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
      }
    };

    const cardElement = cardRef.current;
    if (cardElement) {
      cardElement.addEventListener('mousemove', handleMouseMove);
      cardElement.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      if (cardElement) {
        cardElement.removeEventListener('mousemove', handleMouseMove);
        cardElement.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, []);

  return (
    <AnimationContainer className="size-auto">
      <article className="group flex flex-col">
        <Link
          href={`/${language}/projects/${slug}`}
          className="flex flex-col items-center gap-3"
        >
          <div
            ref={cardRef}
            className="group/projectCard glass-card hover:shadow-glass-lg relative transform-gpu overflow-hidden rounded-xl p-4 transition-all duration-700 md:p-6"
          >
            {/* Animated background gradient */}
            <div className="from-primary/5 to-primary/20 absolute inset-0 rounded-xl bg-gradient-to-br opacity-0 transition-opacity duration-500 group-hover/projectCard:opacity-100" />

            {/* Animated border */}
            <div className="group-hover/projectCard:border-primary/30 absolute inset-0 rounded-xl border border-white/10 transition-colors duration-500" />

            <div className="relative z-[1] flex flex-col items-center gap-4 self-stretch">
              {/* Enhanced image container */}
              <div className="group/projectImg group-hover/projectCard:border-primary/20 relative max-h-[11.875rem] shrink-0 overflow-hidden rounded-lg border border-transparent shadow-lg transition-all duration-500 sm:h-[11.875rem] sm:max-h-max 2xl:h-[12.8125rem]">
                <Image
                  src={image}
                  alt={alt}
                  width={1000}
                  height={1000}
                  className="aspect-[18/9] max-h-[11.875rem] w-full object-cover brightness-90 transition-all duration-700 ease-out group-hover/projectImg:scale-110 group-hover/projectImg:brightness-110 sm:w-auto 2xl:max-h-[12.8125rem]"
                />

                {/* Enhanced overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                {/* Floating action button */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/30 bg-black/70 px-6 py-2 opacity-0 backdrop-blur-sm transition-all duration-500 group-hover/projectImg:opacity-100 hover:scale-105 hover:bg-black/90">
                  <span className="flex items-center gap-2 text-sm font-medium text-white lg:text-base">
                    {t('view_project')}
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </span>
                </div>

                {/* Tech badges overlay */}
                <div className="absolute top-3 right-3 flex flex-wrap gap-1 opacity-0 transition-opacity duration-500 group-hover/projectImg:opacity-100">
                  {techs.slice(0, 2).map((tech, index) => (
                    <span
                      key={tech}
                      className="rounded-full bg-black/60 px-2 py-1 text-xs font-medium text-white backdrop-blur-sm"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Enhanced header section */}
              <div className="flex w-full flex-col items-center gap-3 lg:gap-4">
                {/* Title with dots */}
                <header className="flex w-full items-center justify-center gap-3 lg:gap-5">
                  <ProjectTripleDots color={slug} size="sm" />
                  <h3 className="text-foreground group-hover/projectCard:text-primary text-lg font-semibold transition-colors duration-300 lg:text-xl">
                    {t(title)}
                  </h3>
                </header>

                {/* Description */}
                {short_description && (
                  <p className="text-muted-foreground line-clamp-2 text-center text-sm leading-relaxed opacity-0 transition-opacity duration-500 group-hover/projectCard:opacity-100">
                    {short_description}
                  </p>
                )}

                {/* Tech stack pills */}
                <div className="flex flex-wrap justify-center gap-2 opacity-0 transition-opacity duration-500 group-hover/projectCard:opacity-100">
                  {techs.slice(0, 3).map((tech, index) => (
                    <span
                      key={tech}
                      className="bg-primary/10 text-primary border-primary/20 rounded-full border px-3 py-1 text-xs font-medium"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Status indicator */}
                <div className="flex items-center gap-2 opacity-0 transition-opacity duration-500 group-hover/projectCard:opacity-100">
                  <div className="h-2 w-2 animate-pulse rounded-full bg-green-500" />
                  <span className="text-muted-foreground text-xs">
                    {url ? 'Live Project' : 'In Development'}
                  </span>
                </div>
              </div>
            </div>

            {/* Floating particles */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-xl">
              <div className="bg-primary/40 animate-float absolute top-4 left-4 h-1 w-1 rounded-full opacity-0 transition-opacity duration-500 group-hover/projectCard:opacity-100" />
              <div
                className="bg-primary/60 animate-float absolute right-6 bottom-6 h-1 w-1 rounded-full opacity-0 transition-opacity duration-500 group-hover/projectCard:opacity-100"
                style={{ animationDelay: '1s' }}
              />
              <div
                className="bg-primary/30 animate-float absolute top-1/2 right-4 h-0.5 w-0.5 rounded-full opacity-0 transition-opacity duration-500 group-hover/projectCard:opacity-100"
                style={{ animationDelay: '2s' }}
              />
            </div>
          </div>
        </Link>
      </article>
    </AnimationContainer>
  );
};

export default ProjectCard;
