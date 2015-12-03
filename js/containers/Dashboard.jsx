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
    if(!this.props.videoStore.meta.current_page)
      actions.fetchVideos(1)
  }

  render() {
    const { dispatch } = this.props
    const actions = bindActionCreators(videoActions, dispatch)
    return (
      <main className='container'>
        <ListVideo
          videos={this.props.videoStore.data}
          currentPage={this.props.videoStore.meta.current_page}
          loading={this.props.videoStore.Loading}
          {...actions}
          {...this.props}/>
      </main>
    )
  }
}
