'use server';

import fs from 'fs';
import path from 'path';
import { ProjectType } from '@/utils';

/**
 * Get all projects from the projects.json file
 * @returns {Promise<ProjectType[]>}
 */
export const getProjects = async (): Promise<ProjectType[]> => {
  const filePath = path.join(process.cwd(), `public/projects.json`);
  const content = fs.readFileSync(filePath, 'utf8');

  return JSON.parse(content || '[]');
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
