import React from 'react'
import { Route, IndexRoute } from 'react-router'
import Root from '../containers/Root.jsx'
import Dashboard from '../containers/Dashboard.jsx'
import DetailVideo from '../containers/DetailVideo.jsx'
import ListVideoContainer from '../containers/ListVideoContainer.jsx'
import Player from '../components/Player.jsx'

export default (
  <Route path='/' component={Root}>
    <Route component={Dashboard}>
      <IndexRoute component={ListVideoContainer} />
    </Route>
    <Route path='/details' component={DetailVideo} />
    <Route path='/player' component={Player} />
  </Route>
)
