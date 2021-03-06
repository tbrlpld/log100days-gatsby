import { Link } from 'gatsby'
import PropTypes from 'prop-types'
import React from 'react'

import Nav from './nav'
import style from './header.module.css'

const collapsibleToggleClick = (event) => {
  const collapsibleContainer = event.target.parentElement
  collapsibleContainer.classList.toggle(style.collapsed)
}

const Header = ({ siteTitle, author, authorHomePage }) => {
  const authorElement = author
    ? <>{' by '}<a href={authorHomePage} target='_blank' rel='noopener noreferrer'>{author}</a></>
    : <></>
  return (
    <header className={style.header}>
      <div className={style.siteTitle}><Link to='/'>{siteTitle}</Link></div>
      <div className={style.collapsibleContainer + ' ' + style.collapsed}>
        <div className={style.collapsible}>
          <div className={style.siteAuthor}>{authorElement}</div>
          <Nav />
        </div>
        <button className={style.toggler} onClick={collapsibleToggleClick}>Toggle navigation menu</button>
      </div>
    </header>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
  author: PropTypes.string,
  authorHomePage: PropTypes.string
}

Header.defaultProps = {
  siteTitle: '#100DaysOfCode Log',
  author: '',
  authorHomePage: ''
}

export default Header
