import React from 'react'
import { Route, IndexRoute } from 'react-router'
import Root from '../containers/Root.jsx'
import Dashboard from '../containers/Dashboard.jsx'
import DetailVideo from '../containers/DetailVideo.jsx'

export default (
  <Route path='/' component={Root}>
    <IndexRoute component={Dashboard} />
    <Route path='/details' component={DetailVideo} />
  </Route>
)
