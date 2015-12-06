import * as ActionTypes from '../constants/ActionTypes'

export default function detailStore(state = { Loading: false, genre: { name: '' } }, action) {
  switch (action.type) {
    case ActionTypes.SET_DETAIL:
      return Object.assign({}, state, { ...action.json })
    case ActionTypes.LOADING_DETAIL:
      return Object.assign({}, state, {
        Loading: action.Loading
      })
    default:
      return state
  }
}
