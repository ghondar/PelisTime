import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { Router } from 'react-router'
import configureStore from '../store/configureStore'
import routes from '../routes/routes'

const store = configureStore()

export default class App extends Component{
  render() {
    return (
      <Provider store={store}>
        <Router>{routes}</Router>
      </Provider>
    )
  }
}
