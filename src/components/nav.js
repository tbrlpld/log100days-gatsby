import React from 'react'
import { Link, useStaticQuery, graphql } from 'gatsby'

const Nav = () => {
  const data = useStaticQuery(graphql`
    {
      allMarkdownRemark {
        edges {
          node {
            id
            fields {
              slug
            }
            parent {
              ... on File {
                id
                relativeDirectory
                name
              }
            }
          }
        }
      }
    }
  `)
  const topLevelPages = data.allMarkdownRemark.edges.filter((item) => {
    return (
      item.node.parent.relativeDirectory === '' &&
      item.node.parent.name !== 'README'
    )
  })
  topLevelPages.sort((a, b) => a.node.parent.name > b.node.parent.name)
  const menuEntries = topLevelPages.map((item) => {
    return (
      <li key={item.node.id}>
        <Link to={item.node.fields.slug}>
          {item.node.parent.name.toUpperCase()}
        </Link>
      </li>
    )
  })
  return (
    <nav>
      <ul>
        {menuEntries}
      </ul>
    </nav>
  )
}

export default Nav
