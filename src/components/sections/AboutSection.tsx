'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { differenceInYears } from 'date-fns';

import { env } from '@env';
import { useTranslation } from '@/i18n/client';
import TitleEclipse from '@/components/svgs/TitleEclipse';

import myImage from '@public/images/about_image.png';

const AboutSection: React.FC = () => {
  const {
    t,
    i18n: { language },
  } = useTranslation();

  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  // Skills data for visualization
  const skills = [
    { name: 'React', level: 95, color: '#61DAFB' },
    { name: 'Next.js', level: 90, color: '#000000' },
    { name: 'TypeScript', level: 88, color: '#3178C6' },
    { name: 'Node.js', level: 85, color: '#339933' },
    { name: 'Python', level: 80, color: '#3776AB' },
    { name: 'PostgreSQL', level: 78, color: '#336791' },
  ];

  // Timeline data
  const timeline = [
    {
      year: '2021',
      title: 'Started Programming',
      description: 'Began learning web development fundamentals',
      color: '#61DAFB',
    },
    {
      year: '2022',
      title: 'First Projects',
      description: 'Built first full-stack applications',
      color: '#339933',
    },
    {
      year: '2023',
      title: 'Professional Growth',
      description: 'Advanced in React and TypeScript',
      color: '#3178C6',
    },
    {
      year: '2024',
      title: 'Current Focus',
      description: 'Mastering modern web technologies',
      color: '#663BC3',
    },
  ];

  // 3D image tilt effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (imageRef.current) {
        const rect = imageRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;

        imageRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      }
    };

    const handleMouseLeave = () => {
      if (imageRef.current) {
        imageRef.current.style.transform =
          'perspective(1000px) rotateX(0deg) rotateY(0deg)';
      }
    };

    const imageElement = imageRef.current;
    if (imageElement) {
      imageElement.addEventListener('mousemove', handleMouseMove);
      imageElement.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      if (imageElement) {
        imageElement.removeEventListener('mousemove', handleMouseMove);
        imageElement.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, []);

  return (
    <section
      id="nav-about"
      className="3xl:min-h-lg relative flex min-h-screen w-full flex-col items-center justify-start gap-10 overflow-hidden px-[10%] py-10 md:gap-12 md:px-[15%] md:py-14 lg:gap-16"
    >
      {/* Background enhancements */}
      <div className="from-background via-background/98 to-background/95 absolute inset-0 bg-gradient-to-br" />
      <div className="bg-mesh absolute inset-0 opacity-30" />

      {/* Floating elements */}
      <div className="bg-primary/10 animate-float absolute top-20 right-20 h-32 w-32 rounded-full blur-3xl" />
      <div
        className="bg-primary/5 animate-float absolute bottom-32 left-16 h-24 w-24 rounded-full blur-2xl"
        style={{ animationDelay: '2s' }}
      />

      <div className="relative flex w-full items-center justify-center gap-6 py-10 md:py-[72px]">
        <TitleEclipse className="absolute top-1/2 left-1/2 h-[350px] -translate-x-1/2 -translate-y-1/2 opacity-80 md:h-[400px] lg:h-[800px]" />
        <div className="h-10 w-full text-center sm:h-12 md:h-16">
          <h2
            data-transition-target="text-blur"
            className="text-shadow-glow via-primary/80 animate-gradient-shift absolute left-1/2 w-full -translate-x-1/2 bg-gradient-to-r from-white to-white bg-clip-text text-4xl leading-[100.5%] font-black tracking-[1.28px] whitespace-nowrap text-transparent text-white/90 uppercase mix-blend-overlay backdrop-blur-[2.8256px] sm:text-5xl md:w-auto md:text-[64px]"
          >
            {t('about_me')}
          </h2>
        </div>
      </div>

      <div
        data-transition="animate"
        className="relative z-[1] mx-auto grid w-full max-w-7xl grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16"
      >
        {/* Image and Personal Info */}
        <div className="space-y-8">
          <div
            ref={imageRef}
            data-transition-target="scale"
            className="group relative cursor-pointer"
          >
            <div className="glass-card hover:shadow-glass-lg p-4 transition-all duration-500">
              <div className="relative overflow-hidden rounded-2xl">
                <Image
                  src={myImage}
                  alt={t('about_image_alt')}
                  priority
                  quality={100}
                  className="relative z-[1] h-auto w-full rounded-2xl transition-all duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/50 to-transparent" />
                <div className="bg-primary/20 absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              </div>
            </div>
          </div>

          {/* Personal Stats */}
          <div
            data-transition-target="fade-in-up"
            className="glass-card space-y-4 p-6"
          >
            <h3 className="text-foreground mb-4 text-xl font-bold">
              Quick Facts
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-primary text-3xl font-bold">
                  {differenceInYears(new Date(), new Date(2003, 0, 20))}
                </div>
                <div className="text-muted-foreground text-sm">Years Old</div>
              </div>
              <div className="text-center">
                <div className="text-primary text-3xl font-bold">3+</div>
                <div className="text-muted-foreground text-sm">
                  Years Coding
                </div>
              </div>
              <div className="text-center">
                <div className="text-primary text-3xl font-bold">15+</div>
                <div className="text-muted-foreground text-sm">Projects</div>
              </div>
              <div className="text-center">
                <div className="text-primary text-3xl font-bold">∞</div>
                <div className="text-muted-foreground text-sm">Passion</div>
              </div>
            </div>
          </div>
        </div>

        {/* Content and Skills */}
        <div className="space-y-8">
          {/* About Text */}
          <div className="space-y-4">
            <div data-transition-target="fade-in-up" className="glass-card p-6">
              <p className="text-muted-foreground text-sm leading-relaxed font-medium md:text-base lg:text-lg">
                {t('about_section_text_part_1', {
                  age: differenceInYears(new Date(), new Date(2003, 0, 20)),
                  location:
                    language === 'pt-BR'
                      ? env.NEXT_PUBLIC_PERSONAL_LOCATION_BR
                      : env.NEXT_PUBLIC_PERSONAL_LOCATION_EN,
                })}
              </p>
            </div>

            <div data-transition-target="fade-in-up" className="glass-card p-6">
              <p className="text-muted-foreground text-sm leading-relaxed font-medium md:text-base lg:text-lg">
                {t('about_section_text_part_2')}
              </p>
            </div>

            <div data-transition-target="fade-in-up" className="glass-card p-6">
              <p className="text-muted-foreground text-sm leading-relaxed font-medium md:text-base lg:text-lg">
                {t('about_section_text_part_3')}
              </p>
            </div>

            <div data-transition-target="fade-in-up" className="glass-card p-6">
              <p className="text-muted-foreground text-sm leading-relaxed font-medium md:text-base lg:text-lg">
                {t('about_section_text_part_4')}
              </p>
            </div>
          </div>

          {/* Skills Visualization */}
          <div data-transition-target="fade-in-up" className="glass-card p-6">
            <h3 className="text-foreground mb-6 text-xl font-bold">
              Technical Skills
            </h3>
            <div className="space-y-4">
              {skills.map((skill, index) => (
                <div
                  key={skill.name}
                  className="group cursor-pointer"
                  onMouseEnter={() => setHoveredSkill(skill.name)}
                  onMouseLeave={() => setHoveredSkill(null)}
                >
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-foreground text-sm font-medium">
                      {skill.name}
                    </span>
                    <span className="text-muted-foreground text-xs">
                      {skill.level}%
                    </span>
                  </div>
                  <div className="bg-muted h-2 w-full overflow-hidden rounded-full">
                    <div
                      className="relative h-full rounded-full transition-all duration-1000 ease-out"
                      style={{
                        width: `${hoveredSkill === skill.name ? skill.level : 0}%`,
                        backgroundColor: skill.color,
                        animationDelay: `${index * 100}ms`,
                      }}
                    >
                      <div className="absolute inset-0 rounded-full bg-white/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Timeline */}
      <div
        data-transition-target="fade-in-up"
        className="mx-auto w-full max-w-4xl"
      >
        <h3 className="text-foreground mb-8 text-center text-2xl font-bold">
          Journey Timeline
        </h3>
        <div className="relative">
          {/* Timeline line */}
          <div className="from-primary to-primary/30 absolute top-0 bottom-0 left-1/2 w-0.5 -translate-x-1/2 transform bg-gradient-to-b" />

          <div className="space-y-12">
            {timeline.map((item, index) => (
              <div
                key={item.year}
                data-transition-target="stagger"
                className={`flex items-center ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}
              >
                <div
                  className={`w-5/12 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}
                >
                  <div className="glass-card group hover:shadow-glass-lg p-6 transition-all duration-300">
                    <div className="mb-2 flex items-center gap-3">
                      <div
                        className="h-3 w-3 rounded-full"
                        style={{ backgroundColor: item.color }}
                      />
                      <h4 className="text-foreground text-lg font-bold">
                        {item.year}
                      </h4>
                    </div>
                    <h5 className="text-foreground mb-2 text-base font-semibold">
                      {item.title}
                    </h5>
                    <p className="text-muted-foreground text-sm">
                      {item.description}
                    </p>
                  </div>
                </div>

                {/* Timeline dot */}
                <div className="absolute left-1/2 -translate-x-1/2 transform">
                  <div
                    className="border-background h-4 w-4 rounded-full border-2"
                    style={{ backgroundColor: item.color }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
