import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/functions'
import './src/styles/global.css'

export const onClientEntry = () => {
  setTimeout(() => {
    const htmlElement = document.getElementsByTagName('html')[0]
    if (htmlElement) {
      htmlElement.style.overflow = 'hidden'
      htmlElement.style.marginRight = '15px'
    }
    const element = document.getElementById('loader-wrapper')
    if (element) {
      element.style.display = 'flex'
    }
  }, 0)
}

export const onInitialClientRender = () => {
  setTimeout(() => {
    const htmlElement = document.getElementsByTagName('html')[0]
    if (htmlElement) {
      htmlElement.style.overflow = 'hidden'
      htmlElement.style.marginRight = '15px'
    }
    const element = document.getElementById('loader-wrapper')
    if (element) {
      element.style.display = 'flex'
    }
  }, 0)
}

export const onRouteUpdate = () => {
  setTimeout(() => {
    const htmlElement = document.getElementsByTagName('html')[0]
    if (htmlElement) {
      htmlElement.style.overflow = 'unset'
      htmlElement.style.marginRight = '0px'
    }
    const element = document.getElementById('loader-wrapper')
    if (element) {
      element.classList.add('opacity-0')

      setTimeout(() => {
        element.style.display = 'none'
      }, 500)
    }
  }, 1500)
}
