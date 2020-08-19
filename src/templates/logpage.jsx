import React from 'react'
import { graphql } from 'gatsby'

const LogPage = ({ data }) => {
  return <div>This is there the page goes</div>
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
        }
      }
    }
  }
`
