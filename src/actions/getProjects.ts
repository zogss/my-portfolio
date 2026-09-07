'use server';

import fs from 'fs';
import path from 'path';
import { ProjectSlugType, ProjectType } from '@/utils';

/**
 * Get all projects from the projects.json file
 * @returns {Promise<ProjectType[]>}
 */
export const getProjects = async (): Promise<ProjectType[]> => {
  const filePath = path.join(process.cwd(), `public/projects.json`);
  const content = fs.readFileSync(filePath, 'utf8');

  return JSON.parse(content || '[]');
};

const mainProjectsSlugs: ProjectSlugType[] = [
  'skim-web',
  'skim-mobile',
  'skim-extension',
  'pricetrack',
  'chirp',
  'localize',
  'bull-blockchain',
];

/**
 * Get main projects (max 6) from the projects.json file
 * @returns {Promise<ProjectType[]>}
 */
export const getMainProjects = async (): Promise<ProjectType[]> => {
  const projects = await getProjects();
  return projects
    .filter((project: ProjectType) => mainProjectsSlugs.includes(project.slug))
    .slice(0, 6);
};

/**
 * Get a project by slug
 * @param {string} slug
 * @returns {Promise<ProjectType | undefined>}
 */
export const getProject = async (
  slug: string,
): Promise<ProjectType | undefined> => {
  const projects = await getProjects();
  return projects.find((project) => project.slug === slug);
};
