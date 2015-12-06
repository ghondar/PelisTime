import { SET_VIDEOS, LOADING_VIDEOS, SET_DETAIL, LOADING_DETAIL } from '../constants/ActionTypes'
import { fetchList, fetchDescription } from '../middleware/api'

function setVideos(json) {
  return {
    type: SET_VIDEOS,
    json
  }
}

function setDetail(json) {
  return {
    type: SET_DETAIL,
    json
  }
}

export function setLoad(type, Loading) {
  return {
    type,
    Loading
  }
}

export function fetchVideos(page) {
  return dispatch => {
    dispatch(setLoad(LOADING_VIDEOS, true))
    fetchList(page)
      .then(data => {
        dispatch(setVideos(Object.assign({}, data, {
          Success: true
        })))
        dispatch(setLoad(LOADING_VIDEOS, false))
      })
      .catch(err => {
        dispatch(setVideos({
          Success: false,
          Loading: false
        }))
      })
  }
}

export function fetchDetail(id) {
  return dispatch => {
    dispatch(setLoad(LOADING_DETAIL, true))
    fetchDescription(id)
      .then(data => {
        dispatch(setDetail(data))
        dispatch(setLoad(LOADING_DETAIL, false))
      })
      .catch(err => {
        dispatch(setDetail({ Loading: false }))
      })
  }
}
