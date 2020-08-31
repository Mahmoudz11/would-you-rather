import React, { Component } from 'react'
import { connect } from 'react-redux'

import { setAuthedUser } from '../actions/authedUser'
import User from './User'
import './css/login.css'


class LogInHomePage extends Component {
  componentWillMount() {
    this.props.dispatch(setAuthedUser(false))
  }

  render() {
    const { userIds, location } = this.props
    return (
      <div className="vote-container">
        <h2>Log In To Ask And Answer</h2>
        {userIds.map(id => (
          <div key={id}>
            <User id={id} location={location} />
          </div>
        ))}
      </div>
    )
  }
}

function mapStateToProps(state) {
  const users = state.users
  return {
    userIds: Object.keys(users),
    users
  }
}

export default connect(mapStateToProps)(LogInHomePage)
