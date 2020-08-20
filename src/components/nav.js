import React from 'react'
import { Link, useStaticQuery, graphql } from 'gatsby'

import style from './nav.module.css'

const navToggleClick = (event) => {
  console.log('Toggle Click')
  console.log(style.collapsed)
  const nav = document.getElementById('nav')
  console.log(nav.classList)
  nav.classList.toggle(style.collapsed)
}

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
    <nav id='nav' className={style.nav + ' ' + style.collapsed}>
      <ul>
        {menuEntries}
      </ul>
      <button className={style.toggle} onClick={navToggleClick}>X</button>
    </nav>
  )
}

export default Nav
