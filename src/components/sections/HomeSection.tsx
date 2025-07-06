'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { cn } from '@/utils';

import { useTranslation } from '@/i18n/client';
import SocialLinks from '@/components/SocialLinks';
import HomeEclipse from '@/components/svgs/HomeEclipse';

const HomeSection: React.FC = () => {
  const {
    t,
    i18n: { language },
  } = useTranslation();

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  // Magnetic cursor effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        setMousePosition({ x, y });

        // Magnetic effect for image
        if (imageRef.current) {
          const imageRect = imageRef.current.getBoundingClientRect();
          const imageCenterX = imageRect.left + imageRect.width / 2;
          const imageCenterY = imageRect.top + imageRect.height / 2;
          const distance = Math.sqrt(
            Math.pow(e.clientX - imageCenterX, 2) +
              Math.pow(e.clientY - imageCenterY, 2),
          );

          if (distance < 200) {
            const magneticX = (e.clientX - imageCenterX) * 0.1;
            const magneticY = (e.clientY - imageCenterY) * 0.1;
            imageRef.current.style.transform = `translate(${magneticX}px, ${magneticY}px)`;
          } else {
            imageRef.current.style.transform = 'translate(0px, 0px)';
          }
        }
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section
      id="nav-home"
      ref={heroRef}
      data-transition="animate"
      className="bg-mesh particles relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden"
    >
      {/* Enhanced background with animated mesh gradient */}
      <div className="from-background via-background/95 to-background/80 absolute inset-0 bg-gradient-to-br" />

      {/* Floating particles */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="bg-primary/30 animate-float absolute top-1/4 left-1/4 h-2 w-2 rounded-full"
          style={{ animationDelay: '0s' }}
        />
        <div
          className="bg-primary/20 animate-float absolute top-1/3 right-1/3 h-3 w-3 rounded-full"
          style={{ animationDelay: '2s' }}
        />
        <div
          className="bg-primary/40 animate-float absolute bottom-1/4 left-1/3 h-1 w-1 rounded-full"
          style={{ animationDelay: '4s' }}
        />
        <div
          className="bg-primary/25 animate-float absolute top-2/3 right-1/4 h-2 w-2 rounded-full"
          style={{ animationDelay: '1s' }}
        />
      </div>

      {/* Enhanced Eclipse with glow effect */}
      <HomeEclipse className="animate-pulse-glow absolute top-[55vh] left-[40%] h-[37.5rem] -translate-x-1/2 -translate-y-1/2 opacity-80 md:top-[50vh] lg:top-[40vh] lg:h-[50rem] xl:top-[45vh]" />

      {/* Cursor follower */}
      <div
        className="bg-primary/5 pointer-events-none absolute z-10 h-32 w-32 rounded-full blur-xl transition-all duration-300"
        style={{
          left: mousePosition.x - 64,
          top: mousePosition.y - 64,
        }}
      />

      <div className="relative z-20 flex w-full flex-col-reverse items-center justify-end gap-10 px-[10%] md:justify-center md:gap-5 md:px-[15%] md:pt-0 lg:flex-col">
        <div className="flex w-full flex-col items-center justify-start gap-8 md:gap-12 lg:items-start lg:gap-14 lg:pb-10 2xl:pb-16">
          <div className="flex flex-col items-start justify-start gap-6">
            <div
              className={cn(
                'flex w-full mix-blend-overlay',
                language === 'pt-BR'
                  ? '3xl:h-16 h-36 md:h-48 lg:h-32'
                  : 'h-24 md:h-32 xl:h-16',
              )}
            >
              <h1
                data-transition-target="text-blur"
                className={cn(
                  'text-shadow-glow animate-gradient-shift via-primary/80 absolute left-1/2 -translate-x-1/2 bg-gradient-to-r from-white to-white bg-clip-text text-center text-5xl leading-[100.5%] font-black tracking-[.08rem] text-transparent text-white/90 uppercase backdrop-blur-[.1766rem] sm:max-w-xs md:flex md:justify-center md:text-[4rem] lg:left-auto lg:block lg:translate-x-0 lg:text-start',
                  language === 'pt-BR'
                    ? '3xl:max-w-none 3xl:whitespace-nowrap lg:max-w-xl'
                    : 'lg:max-w-xs xl:max-w-none xl:whitespace-nowrap',
                )}
              >
                {t('software_engineer')}
              </h1>
            </div>

            <div
              data-transition-target="fade-in-up"
              className="glass-card rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl"
            >
              <h2 className="text-muted-foreground z-[3]">
                <p className="w-full max-w-sm text-center text-sm leading-relaxed font-medium lg:text-start">
                  {t('home_section_description_part_1')}{' '}
                  <b className="text-foreground text-glow font-bold">
                    Yan Lucas
                  </b>
                  {t('home_section_description_part_2')}
                </p>
              </h2>
            </div>
          </div>

          <div data-transition-target="stagger" className="stagger-children">
            <SocialLinks
              animate
              className="z-[3] gap-4 text-white/60 transition-colors duration-300 hover:text-white/80"
              iconSize="lg"
            />
          </div>
        </div>

        <div
          ref={imageRef}
          data-transition-target="scale"
          className={cn(
            'magnetic shadow-glass-lg lg:shadow-glass ease-spring hover:shadow-glass-lg relative z-[2] flex size-[12.5rem] items-start overflow-hidden rounded-full border border-white/10 bg-gradient-to-bl from-white/10 to-black/10 backdrop-blur-xl transition-all duration-500 hover:scale-105 md:size-[18.75rem] md:translate-y-0 lg:absolute lg:right-[5%] lg:h-auto lg:w-[43.75rem] lg:items-center lg:justify-end lg:overflow-auto lg:rounded-2xl lg:border-white/5 lg:bg-gradient-to-l lg:from-black/20 lg:to-black/0 xl:right-[6%] 2xl:right-[12%]',
            language === 'pt-BR'
              ? ''
              : 'xl:translate-y-[9%] 2xl:translate-y-[7%]',
          )}
        >
          {/* Animated border */}
          <div className="border-gradient absolute inset-0 rounded-full opacity-0 transition-opacity duration-500 hover:opacity-100 lg:rounded-2xl" />

          {/* Glow effect */}
          <div className="bg-primary/20 absolute inset-0 scale-110 rounded-full opacity-0 blur-xl transition-opacity duration-500 hover:opacity-30 lg:rounded-2xl" />

          <Image
            src="/images/yan_main_photo.png"
            alt={t('yan_main_photo_alt')}
            quality={100}
            width={620}
            height={620}
            className="z-[3] size-[12.5rem] shrink-0 translate-y-4 rounded-full transition-transform duration-500 hover:scale-105 md:size-[21.875rem] md:translate-y-0 md:rounded-none lg:z-0 lg:size-[32.5rem] 2xl:size-[38.75rem]"
          />
        </div>
      </div>

      {/* Floating action button */}
      <div className="absolute right-8 bottom-8 z-30">
        <button className="group btn-secondary hover-magnetic focus-ring rounded-full p-4">
          <svg
            className="h-6 w-6 transition-transform duration-300 group-hover:rotate-45"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </button>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-4 left-1/2 z-30 -translate-x-1/2 transform">
        <div className="text-muted-foreground flex flex-col items-center gap-2">
          <span className="text-xs tracking-wider uppercase">Scroll</span>
          <div className="from-primary h-8 w-0.5 animate-pulse rounded-full bg-gradient-to-b to-transparent" />
        </div>
      </div>
    </section>
  );
};

export default HomeSection;
