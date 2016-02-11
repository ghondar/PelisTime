import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { Router, hashHistory } from 'react-router'
import configureStore from '../store/configureStore'
import routes from '../routes/routes.jsx'

const store = configureStore()

export default class App extends Component{
  render() {
    return (
      <Provider store={store}>
        <Router history={hashHistory}>{routes}</Router>
      </Provider>
    )
  }
}
