import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

const Navbar = ({handleClick, isLoggedIn, userId}) => (
  <div>
    <h1 style={{color: 'black', fontFamily: 'Lemon, curisve'}}>#FireKicks</h1>
    <nav>
      {isLoggedIn ? (
        <div className="nav">
          {/* The navbar will show these links after you log in */}
          <Link
            to="/"
            style={{
              color: 'black',
              fontFamily: 'Lemon, curisve'
            }}
          >
            All Products
          </Link>
          <Link
            to="/home"
            style={{color: 'black', fontFamily: 'Lemon, curisve'}}
          >
            My Profile
          </Link>
          <a
            href="#"
            onClick={handleClick}
            style={{color: 'black', fontFamily: 'Lemon, curisve'}}
          >
            Logout
          </a>
          <Link
            to={`/cart/${userId}`}
            style={{color: 'black', fontFamily: 'Lemon, curisve'}}
          >
            Cart
          </Link>
        </div>
      ) : (
        <div className="nav">
          {/* The navbar will show these links before you log in */}
          <Link
            to="/"
            style={{
              color: 'black',
              fontFamily: 'Lemon, curisve'
            }}
          >
            All Products
          </Link>
          <Link
            to="/login"
            style={{color: 'black', fontFamily: 'Lemon, curisve'}}
          >
            Login
          </Link>
          <Link
            to="/signup"
            style={{color: 'black', fontFamily: 'Lemon, curisve'}}
          >
            Sign Up
          </Link>
          <Link
            to="/cart"
            style={{color: 'black', fontFamily: 'Lemon, curisve'}}
          >
            Cart
          </Link>
        </div>
      )}
    </nav>
    <hr />
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    userId: state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  userId: PropTypes.number
}
