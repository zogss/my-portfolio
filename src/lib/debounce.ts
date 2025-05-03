/* eslint-disable @typescript-eslint/no-this-alias */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Procedure = (...args: any[]) => void;

export interface DebouncedFunction<F extends Procedure> {
  (this: ThisParameterType<F>, ...args: Parameters<F>): void;
  cancel: () => void;
}

export const debounce = <F extends Procedure>(
  func: F,
  threshold = 50,
  execAsap = false,
): DebouncedFunction<F> => {
  let timeoutId: ReturnType<typeof setTimeout> | undefined;

  const debouncedFunction = function (
    this: ThisParameterType<F>,
    ...args: Parameters<F>
  ) {
    const context = this;

    const delayed = () => {
      if (!execAsap) {
        func.apply(context, args);
      }
      timeoutId = undefined;
    };

    if (timeoutId) {
      clearTimeout(timeoutId);
    } else if (execAsap) {
      func.apply(context, args);
    }

    timeoutId = setTimeout(delayed, threshold);
  };

  debouncedFunction.cancel = () => {
    if (timeoutId !== undefined) {
      clearTimeout(timeoutId);
    }
  };

  return debouncedFunction;
};
