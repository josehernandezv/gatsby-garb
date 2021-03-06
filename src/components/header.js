import React, { useEffect } from 'react'
import { Link } from 'gatsby'
import PropTypes from 'prop-types'
import gatsbyLogo from '../images/gatsby-icon.png'

const netlifyIdentity =
  typeof window !== 'undefined' ? require('netlify-identity-widget') : null

const isActive = ({ isCurrent }) => {
  return {
    className: isCurrent ? 'active' : 'navlink',
  }
}

const NavLink = props => <Link getProps={isActive} {...props} />

const Header = ({ siteTitle }) => {
  useEffect(() => {
    if (netlifyIdentity) {
      netlifyIdentity.init()
    }
  }, [])

  return (
    <header
      style={{
        background: `rebeccapurple`,
        marginBottom: `1.45rem`,
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          margin: `0 auto`,
          maxWidth: 960,
          padding: `1.45rem 1.0875rem`,
        }}
      >
        {/* Title / Logo */}
        <span style={{ display: 'flex', alignItems: 'center' }}>
          <img
            src={gatsbyLogo}
            alt="Gatsby Garb Logo"
            style={{
              width: 50,
              margin: '0 5px',
              border: '3px solid orange',
              borderRadius: '50%',
            }}
          />
          <h1 style={{ margin: 0 }}>
            <NavLink to="/">{siteTitle}</NavLink>
          </h1>
        </span>
        <NavLink to="/blog">Blog</NavLink>
        <NavLink to="/products">Store</NavLink>

        <div data-netlify-identity-menu></div>
        {/* Shopping Cart Summary */}
        <div
          className="snipcart-summary snipcart-checkout"
          style={{ color: 'white', cursor: 'pointer' }}
        >
          <div>
            <strong>My Cart</strong>
          </div>
          <div>
            <span
              className="snipcart-total-items"
              style={{ fontWeight: 'bold' }}
            ></span>{' '}
            Items in Cart
          </div>
          <div>
            Total price{' '}
            <span
              className="snipcart-total-price"
              style={{ fontWeight: 'bold' }}
            ></span>
          </div>
        </div>
      </div>
    </header>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
