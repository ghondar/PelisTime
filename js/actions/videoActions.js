import { CARGAR_VIDEOS } from '../constants/ActionTypes'

import { fetchList } from '../middleware/api'

export function setVideos(json) {
  return {
    type: CARGAR_VIDEOS,
    json
  }
}

export function fetchVideos() {
  return dispatch => {
    fetchList()
      .then(data => {
        dispatch(setVideos({
          ...data,
          Success: true
        }))
      })
      .catch(err => {
        dispatch(setVideos({ Success: false }))
      })
  }
}
