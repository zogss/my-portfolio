import React from 'react'
import { Toaster } from 'react-hot-toast'
import Loader from '~/components/Loader'
import Footer from '~/partials/Footer'
import Header from '~/partials/Header'
import WithEnterAnimation from '~/partials/WithEnterAnimation'

interface LayoutProps {
  children: React.ReactNode
}

const MainLayout: React.FC<LayoutProps> = ({ children }) => (
  <WithEnterAnimation>
    <div className="flex min-h-screen w-full flex-col justify-start overflow-hidden text-neutral-100">
      <Header />
      <main className="relative flex w-full flex-col">{children}</main>
      <Footer />
    </div>
    <Loader />
    <Toaster
      position="bottom-right"
      containerClassName="react-hot-toast__container"
      toastOptions={{
        duration: 5000,
        className: 'react-hot-toast__toast',
      }}
    />
  </WithEnterAnimation>
)

export default MainLayout
