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
  const $ = cheerio.load(html)
  $('a[href]').map((index, item) => {
    $(item).attr('href', fixRelativeLinksForGatsby(item.attribs.href))
    $(item).attr('href', fixSlugInLocalMarkdownLinks(item.attribs.href))
    return $(item)
  })
  $('a[href^=http]').map((index, item) => $(item).attr('target', '_blank'))
  return $.html()
}

export const LogPage = ({ data }) => {
  const pageName = data.markdownRemark.parent.name
  const html = data.markdownRemark.html
  const processedHTML = processRawMarkdownHtml(html)
  return (
    <>
      <SEO title={pageName} />
      <Layout>
        <div dangerouslySetInnerHTML={{ __html: processedHTML }} />
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
