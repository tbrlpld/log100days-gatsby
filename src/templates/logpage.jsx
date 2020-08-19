import React from 'react'
import { graphql } from 'gatsby'

import cheerio from 'cheerio'

export const fixRelativeLinksForGatsby = (html) => {
  const $ = cheerio.load(html)
  $('a[href]').toArray().map((elem) => {
    if (!elem.attribs.href.startsWith('/')) {
      elem.attribs.href = '../' + elem.attribs.href
    }
    return elem
  })
  return $.html()
}

export const LogPage = ({ data }) => {
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
