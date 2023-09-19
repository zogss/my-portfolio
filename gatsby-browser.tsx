import 'firebase/firestore'
import MainLayout from './src/layouts/MainLayout'
import './src/styles/global.css'

export const onClientEntry = () => {
  const htmlElement = document.getElementsByTagName('html')[0]
  if (htmlElement) {
    htmlElement.style.overflow = 'hidden'
    htmlElement.style.marginRight = '.9375rem'
  }
  const element = document.getElementById('loader-wrapper')
  if (element) {
    element.style.display = 'flex'
  }
}

export const onInitialClientRender = () => {
  const htmlElement = document.getElementsByTagName('html')[0]
  if (htmlElement) {
    htmlElement.style.overflow = 'hidden'
    htmlElement.style.marginRight = '.9375rem'
  }
  const element = document.getElementById('loader-wrapper')
  if (element) {
    element.style.display = 'flex'
  }
}

export const onRouteUpdate = () => {
  setTimeout(() => {
    const htmlElement = document.getElementsByTagName('html')[0]
    if (htmlElement) {
      htmlElement.style.overflow = 'unset'
      htmlElement.style.marginRight = '0rem'
    }
    const element = document.getElementById('loader-wrapper')
    if (element) {
      element.classList.add('opacity-0')

      setTimeout(() => {
        element.style.display = 'none'
      }, 500)
    }
  }, 500)
}

export const wrapPageElement = MainLayout
