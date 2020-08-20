import { Link } from 'gatsby'
import PropTypes from 'prop-types'
import React from 'react'

import Nav from './nav'

const Header = ({ siteTitle, author, authorHomePage }) => {
  const authorElement = author
    ? <>{' by '}<a href={authorHomePage}>{author}</a></>
    : <></>
  return (
    <header>
      <div>
        <h1>
          <Link to='/'>{siteTitle}</Link>
          {authorElement}
        </h1>
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
