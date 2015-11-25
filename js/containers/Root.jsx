import React, { Component } from 'react'
import devTools from './DevTools'

export default class Root extends Component{
  render() {
    const DevTools = devTools()
    return (
      <div>
        {this.props.children}
        <DevTools />
      </div>
    )
  }
}
