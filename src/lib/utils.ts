/**
 * Finds the scroll container of an element
 * @param el - The element to find the scroll container of
 * @returns The scroll container of the element
 */
export const findScrollContainer = (el: HTMLElement | null): HTMLElement => {
  if (
    el &&
    (el.scrollHeight > el.clientHeight || el.scrollWidth > el.clientWidth)
  ) {
    return el;
  } else if (el?.parentElement) {
    return findScrollContainer(el.parentElement);
  }
  return (document.scrollingElement as HTMLElement) || document.documentElement;
};
