/**
 * Workaround for missing sitePage.context:
 * Used for generating sitemap with `gatsby-plugin-react-i18next` and `gatsby-plugin-sitemap` plugins
 * https://www.gatsbyjs.com/docs/reference/release-notes/migrating-from-v3-to-v4/#field-sitepagecontext-is-no-longer-available-in-graphql-queries
 */

import { GatsbyNode } from 'gatsby'
import path from 'path'
import { ProjectType } from './src/utils/interfaces/project'

const getFileNode = (options: any) => (source: any, _: any, context: any, info: any) => {
  const { fieldName } = info
  const partialPath = source[fieldName]

  if (!partialPath) {
    return null
  }

  const filePath = path.join(__dirname, options.path, partialPath)

  const fileNode = context.nodeModel.findOne({
    type: 'File',
    query: {
      filter: {
        absolutePath: {
          eq: filePath,
        },
      },
    },
  })

  if (!fileNode) {
    return null
  }

  return fileNode
}

export const createSchemaCustomization: GatsbyNode[`createSchemaCustomization`] = ({
  actions,
}): void => {
  const { createTypes, createFieldExtension } = actions

  createFieldExtension({
    name: 'fileByAbsolutePath',
    args: {
      path: {
        type: 'String!',
        defaultValue: '',
      },
    },
    extend: (options: any) => ({
      resolve: getFileNode(options),
    }),
  })

  const typeDefs = `
    type SitePage implements Node {
      context: SitePageContext
    }
    type SitePageContext {
      i18n: i18nContext
    }
    type i18nContext {
        language: String,
        languages: [String],
        defaultLanguage: String,
        originalPath: String
        routed: Boolean
    }
    
    type Project implements Node {
      image: File @fileByAbsolutePath(path: "src/images/projects")
    }`

  createTypes(typeDefs)
}

export const createPages: GatsbyNode[`createPages`] = async ({ graphql, actions }) => {
  const { createPage } = actions

  const result = await graphql<{ content: { nodes: ProjectType[] } }>(`
    query {
      content: allProject {
        nodes {
          id
          slug
          title
          subtitle
          short_description
          long_description
          url
          repository_url
          techs
          image {
            base
            childImageSharp {
              gatsbyImageData(
                placeholder: DOMINANT_COLOR
                quality: 100
                formats: [AUTO, WEBP, AVIF]
              )
            }
          }
          alt
        }
      }
    }
  `)

  if (result.data) {
    result.data.content.nodes.forEach((node) => {
      createPage({
        path: `/projects/${node.slug}`,
        component: path.resolve(`./src/templates/Project.tsx`),
        context: {
          project: node,
        },
      })
    })
  }
}
