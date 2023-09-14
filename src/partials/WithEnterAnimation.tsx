import React, { PropsWithChildren, useEffect } from 'react'

const WithEnterAnimation: React.FC<PropsWithChildren> = ({ children }) => {
  //* effects
  useEffect(() => {
    const targetElements = document.querySelectorAll('[data-animation]') as NodeListOf<HTMLElement>

    const getOffsetTop = (element: HTMLElement) => {
      let offsetTop = 0
      while (element) {
        offsetTop += element.offsetTop
        if (element.offsetParent) {
          element = element.offsetParent as HTMLElement
        } else {
          break
        }
      }
      return offsetTop
    }

    const animeScroll = () => {
      const windowTop = window.scrollY
      const windowHeight = window.innerHeight

      targetElements.forEach((element) => {
        const elementOffsetTop = getOffsetTop(element)
        if (windowTop > elementOffsetTop - windowHeight / 1.1) {
          element.classList.add('animate')
        }
      })
    }

    const debounceScroll = animeScroll

    window.addEventListener('scroll', debounceScroll)

    return () => {
      window.removeEventListener('scroll', debounceScroll)
    }
  }, [])

  //* render
  return children
}

export default WithEnterAnimation
