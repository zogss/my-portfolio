/* eslint-disable @typescript-eslint/no-explicit-any */
import { lstatSync, readdirSync } from 'fs'
import type { GatsbyConfig } from 'gatsby'
import path, { join } from 'path'

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
    'gatsby-transformer-json',
    'gatsby-transformer-remark',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: '@yanlucas/website',
        short_name: '@yanlucas/website',
        start_url: '/',
        background_color: '#121120',
        theme_color: '#121120',
        // Enables "Add to Homescreen" prompt and disables browser UI (including back button)
        // see https://developers.google.com/web/fundamentals/web-app-manifest/#display
        display: 'standalone',
        icon: 'src/images/yan_icon.png', // This path is relative to the root of the site.
        // An optional attribute which provides support for CORS check.
        // If you do not provide a crossOrigin option, it will skip CORS for manifest.
        // Any invalid keyword or empty string defaults to `anonymous`
        crossOrigin: 'use-credentials',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'locale',
        path: path.join(__dirname, 'locales'),
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: path.join(__dirname, 'src', 'images'),
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'data',
        path: path.join(__dirname, 'src', 'data'),
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
