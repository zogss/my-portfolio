import { Link, graphql, type PageProps } from 'gatsby'
import * as React from 'react'
import { Trans, useTranslation } from 'react-i18next'
import Layout from '~/components/Layout'
import Seo from '~/components/Seo'

export const Head = () => {
  //* hooks
  const { t } = useTranslation()

  //* render
  return <Seo title={t('Home')} />
}

const IndexPage: React.FC<PageProps> = () => {
  //* render
  return (
    <Layout>
      <h1>
        <Trans>Hi people</Trans>
      </h1>
      <p>
        <Trans>Welcome to your new Gatsby site.</Trans>
      </p>
      <p>
        <Trans>Now go build something great.</Trans>
      </p>
      <Link to="/page-2/">
        <Trans>Go to page 2</Trans>
      </Link>
    </Layout>
  )
}

export default IndexPage

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
