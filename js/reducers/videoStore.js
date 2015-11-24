import * as ActionTypes from '../constants/ActionTypes'

let defaultState = {
  meta   : {
    total       : null,
    per_page    : null,
    current_page: null,
    last_page   : null,
    from        : null,
    to          : null
  },
  data   : [],
  Success: false
}

export default function(state = defaultState, action) {
  switch (action.type) {
    case ActionTypes.CARGAR_VIDEOS:
      return {
        ...state,
        ...action.json
      }
    default:
      return state
  }
}
