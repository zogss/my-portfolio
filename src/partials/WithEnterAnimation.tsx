import React, { PropsWithChildren, useEffect } from 'react'

const WithEnterAnimation: React.FC<PropsWithChildren> = ({ children }) => {
  //* effects
  useEffect(() => {
    const intersectionObservers: IntersectionObserver[] = []
    const targetElements = document.querySelectorAll('[data-animation]')

    targetElements.forEach((el, i) => {
      intersectionObservers[i] = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            const element = entry.target

            if (entry.isIntersecting) {
              const targetChildElements = element.querySelectorAll('[data-animation-target]')

              targetChildElements.forEach((child, index) => {
                if (!child.classList.contains('animate')) {
                  child.classList.add('animate')
                } else if (targetChildElements.length === index + 1) {
                  intersectionObservers[i].unobserve(el)
                }
              })
            }
          })
        },
        {
          threshold: window.innerWidth > 768 ? 0.2 : 0.4,
        }
      )
      intersectionObservers[i].observe(el)
    })

    return () => {
      if (intersectionObservers.length > 0) {
        intersectionObservers.forEach((observer) => observer.disconnect())
      }
    }
  }, [])

  //* render
  return children
}

export default WithEnterAnimation
