import {lstatSync, readdirSync} from 'fs';
import path, {join} from 'path';
import dotenv from 'dotenv';
import type {GatsbyConfig} from 'gatsby';

import siteMetadata from './config/metadata';

dotenv.config({
  path: `.env.${process.env.NODE_ENV}`,
});

const siteUrl = process.env.GATSBY_SITE_URL;

const defaultLanguage = 'br';

const languages = readdirSync(join(__dirname, 'locales')).filter(fileName => {
  const joinedPath = join(join(__dirname, 'locales'), fileName);
  const isDirectory = lstatSync(joinedPath).isDirectory();
  return isDirectory;
});

const config: GatsbyConfig = {
  siteMetadata,
  // More easily incorporate content into your pages through automatic TypeScript type generation and better GraphQL IntelliSense.
  // If you use VSCode you can also use the GraphQL plugin
  // Learn more at: https://gatsby.dev/graphql-typegen
  graphqlTypegen: true,
  plugins: [
    {
      resolve: 'gatsby-plugin-firebase-v9.0',
      options: {
        credentials: {
          apiKey: process.env.GATSBY_FIREBASE_API_KEY,
          authDomain: process.env.GATSBY_FIREBASE_AUTH_DOMAIN,
          databaseURL: process.env.GATSBY_FIREBASE_DATABASE_URL,
          projectId: process.env.GATSBY_FIREBASE_PROJECT_ID,
          storageBucket: process.env.GATSBY_FIREBASE_STORAGE_BUCKET,
          messagingSenderId: process.env.GATSBY_FIREBASE_MESSAGING_SENDER_ID,
          appId: process.env.GATSBY_FIREBASE_APP_ID,
          measurementId: process.env.GATSBY_FIREBASE_MEASUREMENT_ID,
        },
      },
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'Yan Lucas',
        short_name: 'Yan Lucas',
        start_url: '/',
        background_color: '#121120',
        theme_color: '#121120',
        display: 'standalone',
        icon: 'src/images/icon.png', // This path is relative to the root of the site.
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
        name: 'projects',
        path: path.join(__dirname, 'src', 'data', 'projects'),
      },
    },
    {
      resolve: 'gatsby-plugin-react-i18next',
      options: {
        languages,
        defaultLanguage,
        siteUrl,
        i18nextOptions: {
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
          '@': path.resolve(__dirname, 'src'),
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
          context: {
            i18n: {
              languages: string[];
              originalPath: string;
              defaultLanguage: string;
            };
          };
        }) => {
          const {languages, originalPath, defaultLanguage} = node.context.i18n;
          const url = siteUrl + originalPath;
          const links = [
            {lang: defaultLanguage, url},
            {lang: 'x-default', url},
          ];
          languages.forEach(lang => {
            if (lang === defaultLanguage) return;
            links.push({lang, url: `${siteUrl}/${lang}${originalPath}`});
          });
          return {
            url,
            changefreq: 'daily',
            priority: originalPath === '/' ? 1.0 : 0.7,
            links,
          };
        },
      },
    },
    {
      resolve: `gatsby-transformer-json`,
      options: {
        typeName: ({node}: {node: {sourceInstanceName: string}}) => {
          const name = node.sourceInstanceName;
          if (name === `projects`) {
            return `Project`;
          }
          return name;
        },
      },
    },
    'gatsby-plugin-postcss',
    'gatsby-plugin-image',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    'gatsby-transformer-remark',
  ],
};

export default config;
