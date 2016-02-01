import * as ActionTypes from '../constants/ActionTypes'

const defaultState = {
  title: 'Estrenos',
  view : 'releases',
  type : 'movies'
}

export default function videoStore(state = defaultState, action) {
  switch (action.type) {
    case ActionTypes.SET_VIEW:
      return Object.assign({}, state, action.json)
    default:
      return state
  }
}
