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

export const fixSlugInLocalMarkdownLinks = (html) => {
  const $ = cheerio.load(html)
  $('a[href]').toArray().map((elem) => {
    if (
      !elem.attribs.href.startsWith('http://') &&
      !elem.attribs.href.startsWith('https://') &&
      !elem.attribs.href.startsWith('mailto:') &&
      !elem.attribs.href.startsWith('tel:')
    ) {
      if (elem.attribs.href.endsWith('.md')) {
        elem.attribs.href = elem.attribs.href.slice(0, -3) + '/'
      } else if (elem.attribs.href.endsWith('.md/')) {
        elem.attribs.href = elem.attribs.href.slice(0, -4) + '/'
      }
    }
    return elem
  })
  return $.html()
}

export const LogPage = ({ data }) => {
  const html = data.allMarkdownRemark.edges[0].node.html
  const htmlWithFixedRelativeLinks = fixRelativeLinksForGatsby(html)
  const htmlWithFixedLinkSlugs = fixSlugInLocalMarkdownLinks(htmlWithFixedRelativeLinks)
  return <div dangerouslySetInnerHTML={{ __html: htmlWithFixedLinkSlugs }} />
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
