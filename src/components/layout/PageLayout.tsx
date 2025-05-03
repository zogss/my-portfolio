'use client';

import React from 'react';

import Footer from '@/components/Footer';
import Header from '@/components/Header';
import WithEnterAnimation from '@/components/WithEnterAnimation';

interface PageLayoutProps {
  children: React.ReactNode;
  hideSectionLinks?: boolean;
}

const PageLayout: React.FC<PageLayoutProps> = ({
  children,
  hideSectionLinks,
}) => {
  return (
    <div className="flex min-h-screen w-full flex-col justify-start overflow-hidden text-neutral-100">
      <Header hideSectionLinks={hideSectionLinks} />
      <main className="relative flex size-full flex-1 flex-col">
        {children}
      </main>
      <Footer hideSectionLinks={hideSectionLinks} />
    </div>
  );
};

export default WithEnterAnimation(PageLayout);
