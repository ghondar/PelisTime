import * as ActionTypes from '../constants/ActionTypes'

const defaultState = {
  meta    : {
    total       : 0,
    per_page    : 0,
    current_page: 1,
    last_page   : 2,
    from        : 0,
    to          : 0
  },
  data    : [],
  Loading : false,
  Success : false
}

export default function videoStore(state = {}, action) {
  switch (action.type) {
    case ActionTypes.SET_VIDEOS:
      let newState = {}

      if(state[ action.view ] && action.json.meta.current_page > 1) {
        newState[ action.view ] = {
          meta   : action.json.meta,
          data   : [ ...state[ action.view ].data, ...action.json.data ],
          Success: action.json.Success,
          words  : action.json.words,
          Loading: state[ action.view ].Loading
        }
      }else {
        newState[ action.view ] = {
          meta   : action.json.meta,
          data   : action.json.data,
          Success: action.json.Success,
          words  : action.json.words,
          Loading: true
        }
      }

      return Object.assign({}, state, newState)

    case ActionTypes.CLEAR_VIDEOS:
      let initialState = {}
      initialState[ action.view ] = defaultState

      return Object.assign({}, state, initialState)

    case ActionTypes.LOADING_VIDEOS:
      let loadingState = {}

      if(state[ action.view ]) {
        loadingState[ action.view ] = {
          ...state[ action.view ],
          ...action.Loading
        }
      }else {
        loadingState[ action.view ] = Object.assign({}, defaultState, action.Loading)
      }

      return Object.assign({}, state, loadingState)
    default:
      return state
  }
}
