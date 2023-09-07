import React from 'react'
import { IndexPageProps } from '~/pages'
import Footer from '~/partials/Footer'
import Header from '~/partials/Header'

interface LayoutProps {
  children: React.ReactNode
  pageProps: IndexPageProps
}

const MainLayout: React.FC<LayoutProps> = ({ children, pageProps }) => (
  <div className="flex min-h-screen w-full flex-col justify-start overflow-hidden bg-charcoal-black-700 text-neutral-100">
    <Header pageProps={pageProps} />
    <main className="relative flex w-full flex-col">{children}</main>
    <Footer />
  </div>
)

export default MainLayout
