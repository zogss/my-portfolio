import * as React from 'react';
import {graphql, HeadFC, HeadProps, PageProps} from 'gatsby';
import {StaticImage} from 'gatsby-plugin-image';
import {Link} from 'gatsby-plugin-react-i18next';
import {IoReturnDownBack} from 'react-icons/io5';

import {PageContextType} from '@/utils';
import Seo from '@/components/Seo';

export const Head: HeadFC<I18nPageData, PageContextType> = (
  props: HeadProps<I18nPageData, PageContextType>,
) => <Seo title="Page not found | Yan Lucas" {...props} />;

const NotFoundPage: React.FC<PageProps> = () => (
  <main className="flex min-h-screen w-full flex-col items-center justify-center gap-6 overflow-hidden bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 p-6 text-neutral-100 sm:p-10 lg:gap-8 lg:p-24">
    <div className="flex flex-col items-center text-center">
      <StaticImage
        src="../images/404-illustration.png"
        alt="404 illustration"
        placeholder="blurred"
        layout="constrained"
        width={300}
        height={300}
        className="mb-4 rounded-lg shadow-lg sm:mb-6 sm:size-80"
      />
      <h1 className="mb-3 text-3xl font-extrabold text-white sm:text-4xl lg:mb-4 lg:text-5xl">
        Oops! Page Not Found
      </h1>
      <p className="mb-4 text-base text-gray-300 sm:text-lg lg:mb-6 lg:text-xl">
        Sorry, the page you are looking for doesn’t exist or may have been
        moved.
      </p>
      <Link
        to="/"
        className="mt-4 flex items-center gap-4 rounded-md px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10 sm:mt-6 sm:px-8 sm:py-4 sm:text-base">
        Go Back Home
        <IoReturnDownBack size={24} />
      </Link>
    </div>
  </main>
);

export default NotFoundPage;

export const query = graphql`
  query ($language: String!) {
    locales: allLocale(
      filter: {ns: {in: ["common"]}, language: {eq: $language}}
    ) {
      edges {
        node {
          ns
          data
          language
        }
      }
    }
  }
`;
