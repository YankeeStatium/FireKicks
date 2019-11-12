/* eslint-disable react/void-dom-elements-no-children */
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {updateUserThunk} from '../store/user'

/**
 * COMPONENT
 */

export class UserHome extends Component {
  constructor() {
    super()
    this.state = {
      name: '',
      email: '',
      gender: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event) {
    //only update local state when value is not an empty string
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  async handleSubmit(event) {
    try {
      const {updateUser} = this.props
      const {userId} = this.props
      const {name, email, gender} = this.state
      event.preventDefault()

      // const updatedUser = {
      //   userId,
      //   name: this.state.name || name,
      //   email: this.state.email || email,
      //   gender: this.state.gender || gender
      // }

      await updateUser(userId, name, email, gender)

      this.setState({
        name: '',
        email: '',
        gender: ''
      })
    } catch (error) {
      console.error('err')
    }
  }

  render() {
    const {email, name, gender} = this.props

    return (
      <div>
        <div className="profileHeader">
          <h3>Welcome, {name}!</h3>
        </div>
        <div>
          <h4>Edit Profile Information:</h4>

          <form onSubmit={this.handleSubmit}>
            <label>Name: {name}</label>
            <input
              type="text"
              name="name"
              value={this.state.name}
              onChange={this.handleChange}
            />
            <label>Email: {email}</label>
            <input
              type="text"
              name="email"
              value={this.state.email}
              onChange={this.handleChange}
            />
            <label>Gender: {gender}</label>
            <select
              name="gender"
              onChange={this.handleChange}
              value={this.state.gender}
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
            <div className="Submit">
              <input type="submit" value="Submit Changes" />
            </div>
          </form>
        </div>
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    userId: state.user.id,
    name: state.user.name,
    email: state.user.email,
    gender: state.user.gender
  }
}

const mapDispatch = dispatch => ({
  updateUser: (userId, name, email, gender) =>
    dispatch(updateUserThunk(userId, name, email, gender))
})

export default connect(mapState, mapDispatch)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
