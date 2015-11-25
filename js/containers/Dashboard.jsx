import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as videoActions from '../actions/videoActions'

// Custom Components
import ListVideo from '../components/ListVideo'

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
    return (
      <main>
        <ListVideo videos={this.props.videoStore.data}/>
      </main>
    )
  }
}
