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
  viewStore: state.viewStore,
  videoStore: state.videoStore
}))
export default class Dashboard extends Component{

  constructor(props, context) {
    super(props, context)
  }

  render() {
    const { dispatch, videoStore, viewStore } = this.props

    return (
      <main className='container'>
        <Toolbar
          videoStore= {videoStore}
          viewStore= {viewStore}
          {...bindActionCreators(viewActions, dispatch)}
          {...bindActionCreators(videoActions, dispatch)}/>
        {this.props.children}
      </main>
    )
  }
}
