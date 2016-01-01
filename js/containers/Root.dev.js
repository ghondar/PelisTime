import React, { Component } from 'react'
import DevTools from './DevTools.jsx'

export default class Root extends Component{
  render() {
    return (
      <div>
        {this.props.children}
        <DevTools />
      </div>
    )
  }
}
