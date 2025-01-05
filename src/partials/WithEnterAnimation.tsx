import React, {useEffect} from 'react';

type WithEnterAnimationElement<T = object> = React.FC<T>;

const WithEnterAnimation = <T extends object = object>(
  WrappedComponent: WithEnterAnimationElement<T>,
) => {
  const ComponentWithAnimation = (props: T) => {
    useEffect(() => {
      const intersectionObservers: IntersectionObserver[] = [];
      const targetElements = document.querySelectorAll('[data-transition]');

      targetElements.forEach((el, i) => {
        intersectionObservers[i] = new IntersectionObserver(
          entries => {
            entries.forEach(entry => {
              const element = entry.target;

              if (entry.isIntersecting) {
                const targetChildElements = element.querySelectorAll(
                  '[data-transition-target]',
                );

                targetChildElements.forEach((child, index) => {
                  if (!child.classList.contains('animate')) {
                    child.classList.add('animate');
                  } else if (targetChildElements.length === index + 1) {
                    intersectionObservers[i].unobserve(el);
                  }
                });
              }
            });
          },
          {
            threshold: window.innerWidth > 768 ? 0.2 : 0.4,
          },
        );
        intersectionObservers[i].observe(el);
      });

      return () => {
        if (intersectionObservers.length > 0) {
          intersectionObservers.forEach(observer => observer.disconnect());
        }
      };
    }, []);

    return <WrappedComponent {...props} />;
  };

  ComponentWithAnimation.displayName = `WithEnterAnimation(${
    WrappedComponent.displayName || WrappedComponent.name || 'Component'
  })`;

  return ComponentWithAnimation;
};

export default WithEnterAnimation;
