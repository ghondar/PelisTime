import React from 'react'
import { Route, IndexRoute } from 'react-router'
import Root from '../containers/Root'
import Page1 from '../components/page1'
import Page2 from '../components/page2'

export default (
  <Route path='/' component={Root}>
    <IndexRoute component={Page1} />
    <Route path='/page2' component={Page2} />
  </Route>
)
