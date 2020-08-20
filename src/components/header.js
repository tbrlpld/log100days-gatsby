import { Link } from 'gatsby'
import PropTypes from 'prop-types'
import React from 'react'

import Nav from './nav'
import style from './header.module.css'

const Header = ({ siteTitle, author, authorHomePage }) => {
  const authorElement = author
    ? <>{' by '}<a href={authorHomePage}>{author}</a></>
    : <></>
  return (
    <header className={style.header}>
      <div>
        <div className={style.siteTitle}><Link to='/'>{siteTitle}</Link></div>
        <div className={style.siteAuthor}>{authorElement}</div>
      </div>
      <Nav />
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
