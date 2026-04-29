'use client';

import React, { useEffect } from 'react';

type WithEnterAnimationElement<T = object> = React.FC<T>;

const WithEnterAnimation = <T extends object = object>(
  WrappedComponent: WithEnterAnimationElement<T>,
) => {
  const ComponentWithAnimation = (props: T): React.ReactElement => {
    useEffect(() => {
      const threshold = window.innerWidth > 768 ? 0.2 : 0.4;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;

            const element = entry.target;
            const targetChildElements = element.querySelectorAll(
              '[data-transition-target]',
            );

            let allAnimated = true;
            targetChildElements.forEach((child) => {
              if (!child.classList.contains('animate')) {
                child.classList.add('animate');
                allAnimated = false;
              }
            });

            if (allAnimated) {
              observer.unobserve(element);
            }
          });
        },
        { threshold },
      );

      const targetElements = document.querySelectorAll('[data-transition]');
      targetElements.forEach((el) => observer.observe(el));

      return () => observer.disconnect();
    }, []);

    return <WrappedComponent {...props} />;
  };

  ComponentWithAnimation.displayName = `WithEnterAnimation(${
    WrappedComponent.displayName || WrappedComponent.name || 'Component'
  })`;

  return ComponentWithAnimation;
};

export default WithEnterAnimation;
