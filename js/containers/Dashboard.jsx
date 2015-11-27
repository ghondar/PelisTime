import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as videoActions from '../actions/videoActions'

// Custom Components
import ListVideo from '../components/ListVideo.jsx'

@connect(state => state)
export default class Dashboard extends Component{

  constructor(props, context) {
    super(props, context)
  }

  componentWillMount() {
    const { dispatch } = this.props
    const actions = bindActionCreators(videoActions, dispatch)
    actions.fetchVideos()
  }

  render() {
    const { dispatch } = this.props
    const actions = bindActionCreators(videoActions, dispatch)
    return (
      <main>
        <ListVideo videos={this.props.videoStore.data} scrollFunc={actions.fetchVideosIfNeeded.bind(null, this.props.videoStore.meta.current_page + 1)}/>
      </main>
    )
  }
}
