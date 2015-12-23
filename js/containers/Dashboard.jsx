import React, { PropTypes, Component } from 'react'

// Custom Components
import ListVideoContainer from './ListVideoContainer.jsx'

// Material Compoennts
// import AppBar from 'material-ui/lib/app-bar'

export default class Dashboard extends Component{

  constructor(props, context) {
    super(props, context)
  }

  render() {
    return (
      <main className='container'>
        {/*<AppBar
          title='Title'
          iconClassNameRight='muidocs-icon-navigation-expand-more'
          style={{
            position: 'fixed',
            top     : 0 }} />*/}
        {this.props.children}
      </main>
    )
  }
}
