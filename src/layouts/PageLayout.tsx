import React from 'react';
import ScrollSpy from 'react-ui-scrollspy';

import Footer from '@/partials/Footer';
import Header from '@/partials/Header';
import WithEnterAnimation from '@/partials/WithEnterAnimation';

interface PageLayoutProps {
  children: React.ReactNode;
  hideSectionLinks?: boolean;
}

const PageLayout: React.FC<PageLayoutProps> = ({
  children,
  hideSectionLinks,
}) => (
  <div className="flex min-h-screen w-full flex-col justify-start overflow-hidden text-neutral-100">
    <Header hideSectionLinks={hideSectionLinks} />
    <main className="relative flex size-full flex-1 flex-col">
      <ScrollSpy offsetBottom={100} offsetTop={100}>
        {children}
      </ScrollSpy>
    </main>
    <Footer hideSectionLinks={hideSectionLinks} />
  </div>
);

export default WithEnterAnimation(PageLayout);
