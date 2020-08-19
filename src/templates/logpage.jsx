import React from 'react'
import { graphql } from 'gatsby'

import cheerio from 'cheerio'

import Layout from '../components/layout'

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
  const html = data.markdownRemark.html
  const htmlWithFixedRelativeLinks = fixRelativeLinksForGatsby(html)
  const htmlWithFixedLinkSlugs = fixSlugInLocalMarkdownLinks(htmlWithFixedRelativeLinks)
  return (
    <Layout>
      <div dangerouslySetInnerHTML={{ __html: htmlWithFixedLinkSlugs }} />
    </Layout>
  )
}
export default LogPage

export const query = graphql`
  query ($slug: String!) {
    markdownRemark(fields: {slug: {eq: $slug}}) {
      fields {
        slug
      }
      html
    }
  }
`
