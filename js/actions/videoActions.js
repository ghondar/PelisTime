import { CARGAR_VIDEOS, AGREGAR_VIDEOS } from '../constants/ActionTypes'
import { fetchList } from '../middleware/api'

function setVideos(json) {
  return {
    type: CARGAR_VIDEOS,
    json
  }
}

function addVideos(json) {
  return {
    type: AGREGAR_VIDEOS,
    json
  }
}

export function fetchVideos() {
  return dispatch => {
    fetchList(1)
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

export function fetchVideosIfNeeded(page) {
  return dispatch => {
    fetchList(page)
      .then(data => {
        dispatch(addVideos({
          ...data,
          Success: true
        }))
      })
      .catch(err => {
        dispatch(setVideos({ Success: false }))
      })
  }
}
