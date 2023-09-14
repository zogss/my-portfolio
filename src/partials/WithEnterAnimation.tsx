import React, { PropsWithChildren, useEffect } from 'react'

const WithEnterAnimation: React.FC<PropsWithChildren> = ({ children }) => {
  //* effects
  useEffect(() => {
    const intersectionObservers: IntersectionObserver[] = []
    const targetElements = document.querySelectorAll('[data-animation]')

    targetElements.forEach((el, i) => {
      intersectionObservers[i] = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          const element = entry.target
          if (
            entry.isIntersecting &&
            !(element.firstChild as unknown as Element).classList.contains('animate')
          ) {
            ;(element.firstChild as unknown as Element).classList.add('animate')
          }
        })
      })
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
