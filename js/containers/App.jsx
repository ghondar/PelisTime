import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { Router, hashHistory } from 'react-router'
import configureStore from '../store/configureStore'
import routes from '../routes/routes.jsx'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'

const muiTheme = getMuiTheme({}, {
  tableRow : {
    hoverColor: 'grey'
  }
})

const store = configureStore()

export default class App extends Component{
  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <Provider store={store}>
          <Router history={hashHistory}>{routes}</Router>
        </Provider>
      </MuiThemeProvider>
    )
  }
}
