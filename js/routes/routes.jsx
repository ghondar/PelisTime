import React from 'react'
import { Route, IndexRoute } from 'react-router'
import Root from '../containers/Root.jsx'
import Dashboard from '../containers/Dashboard.jsx'
import Page2 from '../components/page2.jsx'

export default (
  <Route path='/' component={Root}>
    <IndexRoute component={Dashboard} />
    <Route path='/page2' component={Page2} />
  </Route>
)
