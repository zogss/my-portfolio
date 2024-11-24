import {twMerge} from 'tailwind-merge';

/**
 * @description
 * A utility function to merge tailwind classes.
 * used for conditional merging of tailwind classes.
 * @param classNames - An array of tailwind classes
 * @returns A string of tailwind classes.
 * @example
 * cn('text-red-500', 'text-red-600') => text-red-600
 * cn('text-red-500', undefined, 'bg-red-500')
 * **/
export const cn = (
  ...classNames: Array<string | undefined | string>
): string => {
  return twMerge(classNames);
};
