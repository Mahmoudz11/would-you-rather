import { showLoading, hideLoading } from 'react-redux-loading'

import { getInitialedData } from '../utils/api'
import { receivedQuestions } from '../actions/questions'
import { receivedUsers } from '../actions/users'
import { setAuthedUser } from './authedUser'

export function handleInitialedData(userId) {
  return dispatch => {
    dispatch(showLoading())
    return getInitialedData().then(({ users, questions }) => {
      dispatch(setAuthedUser(userId ? userId : null))
      dispatch(receivedQuestions(questions))
      dispatch(receivedUsers(users))
      dispatch(hideLoading())
    })
  }
}
