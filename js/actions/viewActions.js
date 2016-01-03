import { SET_VIEW } from '../constants/ActionTypes'

export function setView(json) {
  return {
    type: SET_VIEW,
    json
  }
}
