/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */
const path = require('path')

exports.onCreateNode = ({ node, getNode, actions }) => {
  // Add slugs to markdown nodes
  if (node.internal.type === 'MarkdownRemark') {
    const fileNode = getNode(node.parent)
    let slug = path.join(fileNode.relativeDirectory, fileNode.name)
    if (!slug.startsWith('/')) { slug = '/' + slug }
    if (!slug.endsWith('/')) { slug = slug + '/' }

    const { createNodeField } = actions
    createNodeField({
      node,
      name: 'slug',
      value: slug
    })
  }
}

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createRedirect } = actions
  createRedirect({
    fromPath: '/',
    toPath: '/README/',
    force: true,
    redirectInBrowser: true,
    statusCode: 200
  })

  const result = await graphql(`
    query {
      allMarkdownRemark {
        edges {
          node {
            fields {
              slug
            }
          }
        }
      }
    }
  `)
  if (result.error) {
    reporter.panicOnBuild('Error while running GraphQL query.')
  }

  const { createPage } = actions
  const logTemplate = path.resolve('./src/templates/logpage.jsx')
  result.data.allMarkdownRemark.edges.forEach(({ node }) => {
    console.log('Creating page:', node.fields.slug)
    createPage({
      path: node.fields.slug,
      component: logTemplate,
      context: {
        slug: node.fields.slug
      }
    })
  })
}
