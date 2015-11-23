import React from 'react'
import { Provider } from 'react-redux'
import configureStore from '../store/configureStore'
import Home from '../components/Home'
import DevTools from './DevTools'

const store = configureStore()

export default React.createClass({
  render() {
    return (
      <Provider store={store}>
        <div>
          <Home />
          { __DEV__ ? <DevTools/> : null }
        </div>
      </Provider>
    )
  }
})
