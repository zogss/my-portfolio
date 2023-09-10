import './src/styles/global.css'

export const onClientEntry = () => {
  setTimeout(() => {
    if (document.getElementById('loader-wrapper')) {
      document.getElementById('loader-wrapper').style.display = 'flex'
    }
  }, 0)
}

export const onInitialClientRender = () => {
  setTimeout(() => {
    if (document.getElementById('loader-wrapper')) {
      document.getElementById('loader-wrapper').style.display = 'flex'
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
  }, 3500)
}
