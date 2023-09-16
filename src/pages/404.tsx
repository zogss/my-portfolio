import { HeadFC, Link, PageProps, graphql } from 'gatsby'
import * as React from 'react'
import Seo from '~/components/Seo'

export const Head: HeadFC = (props) => <Seo title="Page not found | Yan Lucas" {...props} />

const NotFoundPage: React.FC<PageProps> = () => (
  <main className="flex min-h-screen w-full flex-col items-center justify-start gap-4 overflow-hidden p-10 text-neutral-100 sm:items-start lg:p-24">
    <div className="flex max-w-xs flex-col gap-2">
      <h1 className="text-2xl font-bold">Page not found</h1>
      <p className="">
        Sorry 😔, we couldn’t find what you were looking for.
        <br />
        {process.env.NODE_ENV === 'development' ? (
          <>
            <br />
            Try creating a page in <code>src/pages/</code>.
            <br />
          </>
        ) : null}
        <br />
      </p>
    </div>
    <Link to="/">Go home</Link>
  </main>
)

export default NotFoundPage

export const query = graphql`
  query ($language: String!) {
    locales: allLocale(filter: { ns: { in: ["common"] }, language: { eq: $language } }) {
      edges {
        node {
          ns
          data
          language
        }
      }
    }
  }
`
