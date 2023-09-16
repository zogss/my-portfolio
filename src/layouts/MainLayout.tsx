import React from 'react'
import { Toaster } from 'react-hot-toast'
import Loader from '~/components/Loader'

interface LayoutProps {
  element: React.ReactNode
}

const MainLayout: React.FC<LayoutProps> = ({ element }) => (
  <>
    {element}
    <Loader />
    <Toaster
      position="bottom-right"
      containerClassName="react-hot-toast__container"
      toastOptions={{
        duration: 5000,
        className: 'react-hot-toast__toast',
      }}
    />
  </>
)

export default MainLayout
