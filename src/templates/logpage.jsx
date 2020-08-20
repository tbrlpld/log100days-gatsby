import React from 'react'
import { graphql } from 'gatsby'

import cheerio from 'cheerio'

import Layout from '../components/layout'
import SEO from '../components/seo'

export const fixRelativeLinksForGatsby = (href) => {
  if (
    !href.startsWith('/') &&
    !href.startsWith('http://') &&
    !href.startsWith('https://') &&
    !href.startsWith('mailto:') &&
    !href.startsWith('tel:')
  ) {
    href = '../' + href
  }
  return href
}

export const fixSlugInLocalMarkdownLinks = (href) => {
  if (
    !href.startsWith('http://') &&
      !href.startsWith('https://') &&
      !href.startsWith('mailto:') &&
      !href.startsWith('tel:')
  ) {
    if (href.endsWith('.md')) {
      href = href.slice(0, -3) + '/'
    } else if (href.endsWith('.md/')) {
      href = href.slice(0, -4) + '/'
    }
  }
  return href
}

export const processRawMarkdownHtml = (html) => {
  return html
}

export const LogPage = ({ data }) => {
  const pageName = data.markdownRemark.parent.name
  const html = data.markdownRemark.html
  const htmlWithFixedRelativeLinks = fixRelativeLinksForGatsby(html)
  const htmlWithFixedLinkSlugs = fixSlugInLocalMarkdownLinks(htmlWithFixedRelativeLinks)
  return (
    <>
      <SEO title={pageName} />
      <Layout>
        <div dangerouslySetInnerHTML={{ __html: htmlWithFixedLinkSlugs }} />
      </Layout>
    </>
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
      parent {
        ... on File {
          name
        }
      }
    }
  }
`
