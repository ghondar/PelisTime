import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { Router, hashHistory } from 'react-router'
import configureStore from '../store/configureStore'
import routes from '../routes/routes.jsx'

import getMuiTheme from 'material-ui/lib/styles/getMuiTheme'
import themeDecorator from 'material-ui/lib/styles/theme-decorator'
import colors from 'material-ui/lib/styles/colors'

const muiTheme = getMuiTheme({}, {
  tableRow : {
    hoverColor: 'grey'
  }
})

const store = configureStore()

class App extends Component{
  render() {
    return (
      <Provider store={store}>
        <Router history={hashHistory}>{routes}</Router>
      </Provider>
    )
  }
}

export default themeDecorator(muiTheme)(App)
