import React from 'react'
import { graphql } from 'gatsby'

const LogPage = ({ data }) => {
  const html = data.allMarkdownRemark.edges[0].node.html
  return <div dangerouslySetInnerHTML={{ __html: html }} />
}
export default LogPage

export const query = graphql`
  query ($slug: String) {
    allMarkdownRemark(filter: {fields: {slug: {eq: $slug}}}) {
      edges {
        node {
          fields {
            slug
          }
          html
        }
      }
    }
  }
`
