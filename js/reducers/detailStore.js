import * as ActionTypes from '../constants/ActionTypes'

const initiState = {}

export default function detailStore(state = initiState, action) {
  switch (action.type) {
    case ActionTypes.SET_DETAIL:
      return Object.assign({}, state, {
        [ action.json.id ]: Object.assign({}, state[ action.json.id ] || {}, action.json.data)
      })
    case ActionTypes.LOADING_DETAIL:
      return Object.assign({}, state, {
        [ action.Loading.id ]: Object.assign({}, state[ action.Loading.id ] || {}, { Loading: action.Loading.data })
      })
    default:
      return state
  }
}
