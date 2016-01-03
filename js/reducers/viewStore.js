import * as ActionTypes from '../constants/ActionTypes'

const defaultState = {
  view: 'releases'
}

export default function videoStore(state = defaultState, action) {
  switch (action.type) {
    case ActionTypes.SET_VIEW:
      return Object.assign({}, state, { view: action.view })
    default:
      return state
  }
}
