import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as videoActions from '../actions/videoActions'

// Custom Components
import ListVideo from '../components/ListVideo.jsx'

@connect(state => state)
export default class ListVideoContainer extends Component{

  constructor(props, context) {
    super(props, context)
  }

  componentWillMount() {
    const { dispatch, viewStore } = this.props
    const actions = bindActionCreators(videoActions, dispatch)
    actions.fetchVideos(viewStore.view, 1)
  }

  render() {
    const { dispatch, videoStore, viewStore } = this.props
    const actions = bindActionCreators(videoActions, dispatch)
    const stateVideos = videoStore[ viewStore.view ]
    let data = {}

    if(stateVideos) {
      data = {
        videos     : stateVideos.data,
        currentPage: stateVideos.meta.current_page,
        lastPage   : stateVideos.meta.last_page,
        loading    : stateVideos.Loading
      }
    }else {
      data = {
        videos     : [],
        currentPage: 1,
        lastPage   : 2,
        loading    : true
      }
    }

    return (
      <ListVideo
          {...data}
          {...actions}
          {...this.props}/>
    )
  }
}
