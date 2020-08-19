import React from 'react'
import { graphql } from 'gatsby'

import cheerio from 'cheerio'

export const fixRelativeLinksForGatsby = (html) => {
  const $ = cheerio.load(html)
  $('a[href]').toArray().map((elem) => {
    if (
      !elem.attribs.href.startsWith('/') &&
      !elem.attribs.href.startsWith('http://') &&
      !elem.attribs.href.startsWith('https://') &&
      !elem.attribs.href.startsWith('mailto:') &&
      !elem.attribs.href.startsWith('tel:')
    ) {
      elem.attribs.href = '../' + elem.attribs.href
    }
    return elem
  })
  return $.html()
}

export const LogPage = ({ data }) => {
  const html = data.allMarkdownRemark.edges[0].node.html
  const htmlWithFixedLinks = fixRelativeLinksForGatsby(html)
  return <div dangerouslySetInnerHTML={{ __html: htmlWithFixedLinks }} />
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
