import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import './css/user.css'
import { setAuthedUser } from '../actions/authedUser.js'
import { demoAuth } from '../utils/api'

class User extends Component {
  state = {
    redirectToReferrer: false
  }

  handleNewLogin = id => {
    const { dispatch } = this.props

    demoAuth.authenticate(() => {
      dispatch(setAuthedUser(id))
      this.setState({ redirectToReferrer: true })
    })
  }

  render() {
    const { from } = this.props.location.state || {
      from: { pathname: '/home' }
    }
    const { redirectToReferrer } = this.state
    const { user, users } = this.props

    if (redirectToReferrer === true) {
      return <Redirect to={from} />
    }

    return (
      <div className="user">
        <div key={user.id}>
          <div className="avatar-holder-none">
            <img
              src={users[user.id].avatarURL}
              alt={`Avatar of ${users[user.id].avatarURL}`}
              className="avatar"
            />
            <h3 className="author">{`${users[user.id].name}`}</h3>
            <button
              className="loginButton"
              onClick={() => this.handleNewLogin(user.id)}
            >
              Log in
            </button>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps({ authedUser, users }, { id }) {
  const user = users[id]
  return {
    user,
    users
  }
}

export default connect(mapStateToProps)(User)
