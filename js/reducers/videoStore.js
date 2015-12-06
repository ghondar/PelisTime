import * as ActionTypes from '../constants/ActionTypes'

const defaultState = {
  meta    : {
    total       : 0,
    per_page    : 0,
    current_page: 0,
    last_page   : 0,
    from        : 0,
    to          : 0
  },
  data    : [],
  Loading : false,
  Success : false
}

export default function videoStore(state = defaultState, action) {
  switch (action.type) {
    case ActionTypes.SET_VIDEOS:
      return Object.assign({}, state, {
        meta   : action.json.meta,
        data   : [ ...state.data, ...action.json.data ],
        Success: action.json.Success
      })
    case ActionTypes.LOADING_VIDEOS:
      return Object.assign({}, state, {
        Loading: action.Loading
      })
    default:
      return state
  }
}

