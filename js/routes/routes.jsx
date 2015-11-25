import React from 'react'
import { Route, IndexRoute } from 'react-router'
import Root from '../containers/Root'
import Dashboard from '../containers/Dashboard'
import Page2 from '../components/page2'

export default (
  <Route path='/' component={Root}>
    <IndexRoute component={Dashboard} />
    <Route path='/page2' component={Page2} />
  </Route>
)
