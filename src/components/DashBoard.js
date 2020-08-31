import React, { Component } from 'react'
import { connect } from 'react-redux'
import HandleQuestion from './HandleQuestion'
import './css/dashboard.css'
import { createSelector } from 'reselect'

class DashBoard extends Component {
  state = {
    category: 'Unanswered Questions'
  }

  toggleCategory = event => {
    const category = event.target.value

    this.setState(() => ({
      category
    }))
  }

  render() {
    const { category } = this.state
    const { unansweredQuestions, answeredQuestions } = this.props
    return (
      <div>
        <div className="category-toggler">
          <select onChange={this.toggleCategory}>
            <option value="Unanswered Questions">Unanswered Questions</option>
            <option value="Answered Questions">Answered Questions</option>
          </select>
        </div>

        {category === 'Unanswered Questions' && (
          <ul className="questions">
            {unansweredQuestions.map(id => (
              <li key={id} className="question">
                <HandleQuestion id={id} />
              </li>
            ))}
          </ul>
        )}

        {category === 'Answered Questions' && (
          <ul className="questions">
            {answeredQuestions.map(id => (
              <li key={id} className="question">
                <HandleQuestion id={id} />
              </li>
            ))}
          </ul>
        )}
      </div>
    )
  };
};

const allUnansweredQuestions = createSelector(
  state => state.questions,
  state => Object.keys(state.users[state.authedUser].answers),
  state => Object.keys(state.questions),
  (questions, answeredQuestions, questionsId) =>
    questionsId
      .filter(id => !answeredQuestions.includes(id))
      .sort((a, b) => questions[b].timestamp - questions[a].timestamp)
)

const allAnsweredQuestions = createSelector(
  state => state.questions,
  state => Object.keys(state.users[state.authedUser].answers),
  (questions, answers) =>
    answers.sort((a, b) => questions[b].timestamp - questions[a].timestamp)
)


function mapStateToProps(state) {
  const { users, questions } = state
  return {
    users,
    questions,
    answeredQuestions: allAnsweredQuestions(state),
    unansweredQuestions: allUnansweredQuestions(state)
  };
};

export default connect(mapStateToProps)(DashBoard)
