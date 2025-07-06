'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import { ProjectType } from '@/utils';

import { useTranslation } from '@/i18n/client';
import ProjectsBlock from '@/components/projects/ProjectsBlock';
import TitleEclipse from '@/components/svgs/TitleEclipse';

interface ProjectsSectionProps {
  projects?: ProjectType[];
}

const ProjectsSection: React.FC<ProjectsSectionProps> = ({ projects = [] }) => {
  const {
    t,
    i18n: { language },
  } = useTranslation();

  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isAnimating, setIsAnimating] = useState(false);

  // Extract unique tech categories from projects
  const categories = useMemo(() => {
    const techSet = new Set<string>();
    projects.forEach((p) => p.techs.forEach((tech) => techSet.add(tech)));
    const cats = ['all', ...Array.from(techSet).slice(0, 5)]; // Limit to first 5 techs
    return cats;
  }, [projects]);

  // Filter projects based on selected filter and search term
  const filteredProjects = useMemo(() => {
    let filtered = projects;

    if (selectedFilter !== 'all') {
      filtered = filtered.filter((project) =>
        project.techs.includes(selectedFilter),
      );
    }

    if (searchTerm) {
      filtered = filtered.filter(
        (project) =>
          project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          project.short_description
            ?.toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          project.subtitle?.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    return filtered;
  }, [projects, selectedFilter, searchTerm]);

  // Handle filter change with animation
  const handleFilterChange = (filter: string) => {
    setIsAnimating(true);
    setSelectedFilter(filter);
    setTimeout(() => setIsAnimating(false), 300);
  };

  // Featured projects (first 3)
  const featuredProjects = filteredProjects.slice(0, 3);

  return (
    <section
      id="nav-projects"
      className="3xl:min-h-lg relative flex min-h-screen w-full flex-col items-center justify-start gap-10 overflow-hidden px-[10%] py-10 md:gap-12 md:px-[9%] md:py-14 lg:gap-16"
    >
      {/* Background enhancements */}
      <div className="from-background via-background/98 to-background/90 absolute inset-0 bg-gradient-to-br" />
      <div className="bg-mesh absolute inset-0 opacity-20" />

      {/* Floating elements */}
      <div className="bg-primary/5 animate-float absolute top-32 left-20 h-40 w-40 rounded-full blur-3xl" />
      <div
        className="bg-primary/10 animate-float absolute right-24 bottom-40 h-32 w-32 rounded-full blur-2xl"
        style={{ animationDelay: '3s' }}
      />

      <div className="relative z-10 flex w-full flex-col items-center gap-2.5 self-stretch">
        <div className="relative flex w-full items-center justify-center gap-6 py-10 md:py-[4.5rem]">
          <TitleEclipse className="absolute top-1/2 left-1/2 h-[31.25rem] -translate-x-1/2 -translate-y-1/2 opacity-80 lg:h-[50rem]" />
          <div className="h-10 w-full text-center sm:h-12 md:h-16">
            <h2
              data-transition-target="text-blur"
              className="text-shadow-glow via-primary/80 animate-gradient-shift absolute left-1/2 w-full -translate-x-1/2 bg-gradient-to-r from-white to-white bg-clip-text text-4xl leading-[100.5%] font-black tracking-[.08rem] whitespace-nowrap text-transparent text-white/90 uppercase mix-blend-overlay backdrop-blur-[.1766rem] sm:text-5xl md:w-auto md:text-[4rem]"
            >
              {t('projects')}
            </h2>
          </div>
        </div>

        <div data-transition="animate" className="flex w-full justify-center">
          <div
            data-transition-target="fade-in-up"
            className="glass-card max-w-2xl p-6 text-center"
          >
            <h3 className="z-[1] flex flex-col items-center gap-1.5 lg:gap-2.5">
              <span className="text-foreground text-center font-semibold md:text-lg lg:text-xl">
                {t('projects_section_text_part_1')}
              </span>
              <span className="text-muted-foreground text-center text-sm font-medium md:text-base lg:text-lg">
                {t('projects_section_text_part_2')}
              </span>
            </h3>
          </div>
        </div>
      </div>

      {/* Enhanced Project Filters */}
      <div
        data-transition-target="fade-in-up"
        className="mx-auto w-full max-w-4xl space-y-6"
      >
        {/* Search Bar */}
        <div className="glass-card p-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="form-input form-input-primary text-foreground placeholder:text-muted-foreground w-full bg-transparent py-3 pr-4 pl-12"
            />
            <svg
              className="text-muted-foreground absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-3">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleFilterChange(category)}
              className={`rounded-full px-6 py-2 text-sm font-medium transition-all duration-300 ${
                selectedFilter === category
                  ? 'bg-primary text-primary-foreground shadow-primary'
                  : 'glass-card text-muted-foreground hover:text-foreground hover:bg-white/5'
              }`}
            >
              {category === 'all' ? 'All Projects' : category}
            </button>
          ))}
        </div>

        {/* Projects Count */}
        <div className="text-center">
          <span className="text-muted-foreground text-sm">
            {filteredProjects.length}{' '}
            {filteredProjects.length === 1 ? 'project' : 'projects'} found
          </span>
        </div>
      </div>

      {/* Enhanced Projects Display */}
      <div
        className={`w-full transition-all duration-300 ${
          isAnimating
            ? 'scale-95 transform opacity-0'
            : 'scale-100 transform opacity-100'
        }`}
      >
        <ProjectsBlock projects={featuredProjects} />
      </div>

      {/* Featured Projects Showcase */}
      {featuredProjects.length > 0 && (
        <div
          data-transition-target="fade-in-up"
          className="mx-auto w-full max-w-6xl"
        >
          <h3 className="text-foreground mb-8 text-center text-2xl font-bold">
            Featured Projects
          </h3>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featuredProjects.map((project) => (
              <div
                key={project.slug}
                data-transition-target="stagger"
                className="glass-card group hover:shadow-glass-lg p-6 transition-all duration-500 hover:-translate-y-2"
              >
                <div className="relative mb-4 overflow-hidden rounded-xl">
                  <div className="from-primary/20 to-primary/5 flex aspect-video items-center justify-center rounded-xl bg-gradient-to-br">
                    <span className="text-primary/60 text-2xl font-bold">
                      {project.title.charAt(0)}
                    </span>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="bg-primary h-2 w-2 animate-pulse rounded-full" />
                    <span className="text-muted-foreground text-xs tracking-wider uppercase">
                      {project.techs[0] || 'Web Development'}
                    </span>
                  </div>

                  <h4 className="text-foreground group-hover:text-primary text-lg font-semibold transition-colors duration-300">
                    {t(project.title)}
                  </h4>

                  <p className="text-muted-foreground line-clamp-2 text-sm leading-relaxed">
                    {project.short_description ||
                      'An innovative project showcasing modern web development techniques.'}
                  </p>

                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center gap-2">
                      <span className="text-muted-foreground text-xs">
                        View Project
                      </span>
                      <svg
                        className="text-muted-foreground group-hover:text-primary h-4 w-4 transition-colors duration-300 group-hover:translate-x-1"
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
                    </div>

                    <div className="flex items-center gap-1">
                      <div className="bg-primary/40 h-1 w-1 rounded-full" />
                      <div className="bg-primary/60 h-1 w-1 rounded-full" />
                      <div className="bg-primary/80 h-1 w-1 rounded-full" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Enhanced CTA Button */}
      <div data-transition-target="fade-in-up" className="relative z-10">
        <Link
          href={`/${language}/projects`}
          title={t('view_all_projects')}
          className="group btn-primary relative overflow-hidden"
        >
          <span className="relative z-10 flex items-center gap-2 text-sm leading-tight font-medium md:text-base">
            {t('view_all_projects')}
            <svg
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
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
        </Link>
      </div>

      {/* Floating Stats */}
      <div className="glass-card absolute bottom-8 left-8 hidden p-4 lg:block">
        <div className="text-center">
          <div className="text-primary text-2xl font-bold">
            {projects.length}
          </div>
          <div className="text-muted-foreground text-xs">Total Projects</div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
