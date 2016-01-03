import React, { PropTypes, Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as viewActions from '../actions/viewActions'
import * as videoActions from '../actions/videoActions'

// Custom Components
import ListVideoContainer from './ListVideoContainer.jsx'
import Toolbar from '../components/Toolbar.jsx'

// Material Components
import AppBar from 'material-ui/lib/app-bar'

@connect(state => ({
  videoStore: state.videoStore
}))
export default class Dashboard extends Component{

  constructor(props, context) {
    super(props, context)
  }

  render() {
    const { dispatch, videoStore } = this.props

    return (
      <main className='container'>
        <Toolbar
          videoStore = {videoStore}
          {...bindActionCreators(viewActions, dispatch)}
          {...bindActionCreators(videoActions, dispatch)}/>
        {this.props.children}
      </main>
    )
  }
}
