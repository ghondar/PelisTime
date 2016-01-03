import { SET_VIEW } from '../constants/ActionTypes'

export function setView(view) {
  return {
    type: SET_VIEW,
    view
  }
}
