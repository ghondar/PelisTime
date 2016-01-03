import { SET_VIDEOS, LOADING_VIDEOS, CLEAR_VIDEOS, SET_DETAIL, LOADING_DETAIL } from '../constants/ActionTypes'
import { fetchList, fetchDescription, fetchListSearch } from '../middleware/api'

function setVideos(view, json) {
  return {
    type: SET_VIDEOS,
    view,
    json
  }
}

function setDetail(json) {
  return {
    type: SET_DETAIL,
    json
  }
}

export function setLoadVideo(view, Loading) {
  return {
    type: LOADING_VIDEOS,
    view,
    Loading
  }
}

export function setLoadDetail(Loading) {
  return {
    type: LOADING_DETAIL,
    Loading
  }
}

export function clearVideos(view) {
  return {
    type: CLEAR_VIDEOS,
    view
  }
}

export function fetchVideos(view, page) {
  return dispatch => {
    dispatch(setLoadVideo(view, {
      Loading: true,
      Success: false
    }))
    fetchList(view, page)
      .then(data => {
        dispatch(setVideos(view, Object.assign({}, data, {
          Success: true
        })))
        dispatch(setLoadVideo(view, {
          Loading: false
        }))
      })
      .catch(err => {
        dispatch(setVideos(view, {
          Success: false,
          Loading: false
        }))
      })
  }
}

export function fetchVideosSearch(words, page) {
  return dispatch => {
    dispatch(setLoadVideo('search', {
      Loading: true,
      Success: false
    }))
    fetchListSearch(words, page)
      .then(data => {
        dispatch(setVideos('search', Object.assign({}, data, {
          words,
          Success: true
        })))
        dispatch(setLoadVideo('search', {
          Loading: false
        }))
      })
      .catch(err => {
        dispatch(setVideos('search', {
          Success: false,
          Loading: false
        }))
      })
  }
}

export function fetchDetail(id) {
  return dispatch => {
    dispatch(setLoadDetail({
      data: true,
      id
    }))
    fetchDescription(id)
      .then(data => {
        dispatch(setDetail({
          data: Object.assign({}, data, { Success: true }),
          id
        }))
        dispatch(setLoadDetail({
          data: false,
          id
        }))
      })
      .catch(err => {
        dispatch(setDetail({
          data: {
            Success: false,
            Loading: false
          },
          id
        }))
      })
  }
}
