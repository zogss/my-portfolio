/* eslint-disable @typescript-eslint/no-explicit-any */
import { lstatSync, readdirSync } from 'fs'
import type { GatsbyConfig } from 'gatsby'
import { join } from 'path'

const siteUrl = 'https://yanlucas.vercel.app/'

const defaultLanguage = 'br'

const languages = readdirSync(join(__dirname, 'locales')).filter((fileName) => {
  const joinedPath = join(join(__dirname, 'locales'), fileName)
  const isDirectory = lstatSync(joinedPath).isDirectory()
  return isDirectory
})

const config: GatsbyConfig = {
  siteMetadata: {
    author: 'Yan Lucas',
    title: 'Yan Lucas',
    siteUrl,
    description: 'Yan Lucas personal website',
  },
  // More easily incorporate content into your pages through automatic TypeScript type generation and better GraphQL IntelliSense.
  // If you use VSCode you can also use the GraphQL plugin
  // Learn more at: https://gatsby.dev/graphql-typegen
  graphqlTypegen: true,
  plugins: [
    'gatsby-plugin-postcss',
    'gatsby-plugin-image',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/images`,
        name: `images`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/locales`,
        name: `locale`,
      },
    },
    {
      resolve: 'gatsby-plugin-react-i18next',
      options: {
        languages,
        defaultLanguage,
        siteUrl,
        i18nextOptions: {
          // debug: true,
          fallbackLng: defaultLanguage,
          supportedLngs: languages,
          defaultNS: 'common',
          lowerCaseLng: true,
          saveMissing: false,
          interpolation: {
            escapeValue: false, // not needed for react as it escapes by default
          },
          keySeparator: false,
          nsSeparator: false,
        },
      },
    },
    {
      resolve: 'gatsby-plugin-alias-imports',
      options: {
        alias: {
          '~': 'src',
        },
        extensions: ['js', 'jsx', 'ts', 'tsx', 'css'],
      },
    },
    {
      resolve: 'gatsby-plugin-sitemap',
      options: {
        excludes: ['/**/404', '/**/404.html'],
        query: `
        {
          site {
            siteMetadata {
              siteUrl
            }
          }
          allSitePage(filter: {context: {i18n: {routed: {eq: false}}}}) {
            nodes {
              context {
                i18n {
                  defaultLanguage
                  languages
                  originalPath
                }
              }
              path
            }
          }
        }
        `,
        serialize: (node: {
          context: { i18n: { languages: any; originalPath: any; defaultLanguage: any } }
        }) => {
          const { languages, originalPath, defaultLanguage } = node.context.i18n
          const url = siteUrl + originalPath
          const links = [
            { lang: defaultLanguage, url },
            { lang: 'x-default', url },
          ]
          languages.forEach((lang: any) => {
            if (lang === defaultLanguage) return
            links.push({ lang, url: `${siteUrl}/${lang}${originalPath}` })
          })
          return {
            url,
            changefreq: 'daily',
            priority: originalPath === '/' ? 1.0 : 0.7,
            links,
          }
        },
      },
    },
  ],
}

export default config
