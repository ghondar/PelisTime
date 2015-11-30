import { CARGAR_VIDEOS, CARGANDO_VIDEOS } from '../constants/ActionTypes'
import { fetchList } from '../middleware/api'

function setVideos(json) {
  return {
    type: CARGAR_VIDEOS,
    json
  }
}

export function setLoad(Loading) {
  return {
    type: CARGANDO_VIDEOS,
    Loading
  }
}

export function fetchVideos(page) {
  return dispatch => {
    dispatch(setLoad(true))
    fetchList(page)
      .then(data => {
        dispatch(setVideos({
          ...data,
          Success: true
        }))
        dispatch(setLoad(false))
      })
      .catch(err => {
        dispatch(setVideos({
          Success: false,
          Loading: false
        }))
      })
  }
}
