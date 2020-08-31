import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import LoadingBar from 'react-redux-loading'

import { handleInitialedData } from '../actions/shared'
import NavigationBar from './NavigationBar'
import LogInHomePage from '../components/LogIn'
import PrivateRoute from './PrivateRoute'
import DashBoard from './DashBoard'
import Vote from './Vote'
import AddNewQuestion from './AddNewQuestion'
import LeaderBoard from './LeaderBoard'

class App extends Component {
  componentWillMount() {
    this.props.dispatch(handleInitialedData())
  }
  render() {
    return (
      <Router>
        <Fragment>
          <LoadingBar />
          <div>

            <NavigationBar />
            {this.props.loading === true ? null :
             (
              <div>
                <Route path="/" exact component={LogInHomePage} />
                <PrivateRoute path="/home" component={DashBoard} />
                <PrivateRoute
                  path="/question/:question_id"
                  component={Vote}
                />
                <PrivateRoute path="/add" component={AddNewQuestion} />
                <PrivateRoute path="/leaderboard" component={LeaderBoard} />
              </div>
            )}
          </div>
        </Fragment>
      </Router>
    )
  }
}

function mapStateToProps({ loadingBar }) {
  return {
    loading: loadingBar > 0
  }
}

export default connect(mapStateToProps)(App)
