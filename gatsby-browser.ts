import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/functions'
import './src/styles/global.css'

export const onClientEntry = () => {
  setTimeout(() => {
    const element = document.getElementById('loader-wrapper')
    if (element) {
      element.style.display = 'flex'
    }
  }, 0)
}

export const onInitialClientRender = () => {
  setTimeout(() => {
    const element = document.getElementById('loader-wrapper')
    if (element) {
      element.style.display = 'flex'
    }
  }, 0)
}

export const onRouteUpdate = () => {
  setTimeout(() => {
    const element = document.getElementById('loader-wrapper')
    if (element) {
      element.classList.add('opacity-0')

      setTimeout(() => {
        element.style.display = 'none'
      }, 500)
    }
  }, 2000)
}
