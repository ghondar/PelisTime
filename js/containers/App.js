import React, { Component } from 'react'
import { Provider } from 'react-redux'
import configureStore from '../store/configureStore'
import Home from '../components/Home'
import devTools from './DevTools'

const store = configureStore()

export default class App extends Component{
  render() {
    const DevTools = devTools()
    return (
      <Provider store={store}>
        <div>
          <Home />
          <DevTools />
        </div>
      </Provider>
    )
  }
}
