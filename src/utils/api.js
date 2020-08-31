import { _getQuestions, _getUsers } from './_DATA.js'

function getInitialedData() {
  return Promise.all(
    [_getUsers(), _getQuestions()])
    .then(
    ([users, questions]) => ({
      users,
      questions
    })
  )
}

const demoAuth = {
  isAuthenticated: false,
  authenticate(cb) {
    this.isAuthenticated = true
    setTimeout(cb, 100) // fake async
  },
  signout(cb) {
    this.isAuthenticated = false
    setTimeout(cb, 100) // fake async
  }
};

export { getInitialedData, demoAuth };