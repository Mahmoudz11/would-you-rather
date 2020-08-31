import { showLoading, hideLoading } from 'react-redux-loading'

import { _saveQuestionAnswer, _saveQuestion } from '../utils/_DATA'
import { handleInitialedData } from './shared'


export const RECEIVED_QUESTIONS = 'RECEIVED_QUESTIONS'


export function SaveNewQuestionAnswer(answerObj) {
  return dispatch => {
    dispatch(showLoading())

    return _saveQuestionAnswer({
      ...answerObj
    })
      .then(() => dispatch(handleInitialedData(answerObj.authedUser)))
      .then(() => dispatch(hideLoading()))
  };
};


export function SaveNewQuestion(info) {
  console.log('questionObj: ', info)
  return dispatch => {
    dispatch(showLoading())

    return _saveQuestion({
      ...info,
      author: info.authedUser
    })
      .then(res => dispatch(handleInitialedData(res.author)))
      .then(() => console.log('plonk'))
      .then(() => dispatch(hideLoading()))
  }
}

export function receivedQuestions(questions) {
  return {
    type: RECEIVED_QUESTIONS,
    questions
  }
}
