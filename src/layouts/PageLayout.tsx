import React, { PropsWithChildren } from 'react'
import ScrollSpy from 'react-ui-scrollspy'
import Footer from '~/partials/Footer'
import Header from '~/partials/Header'
import WithEnterAnimation from '~/partials/WithEnterAnimation'

const PageLayout: React.FC<PropsWithChildren> = ({ children }) => (
  <WithEnterAnimation>
    <div className="flex min-h-screen w-full flex-col justify-start overflow-hidden text-neutral-100">
      <Header />
      <main className="relative flex w-full flex-col">
        <ScrollSpy offsetBottom={100}>{children}</ScrollSpy>
      </main>
      <Footer />
    </div>
  </WithEnterAnimation>
)

export default PageLayout
