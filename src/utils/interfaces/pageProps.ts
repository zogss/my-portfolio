import {ProjectType} from './project';

export type PageContextType = {
  language: string;
} & Record<string, unknown>;

export type PageContextWithProject = PageContextType & {
  project: ProjectType;
};
