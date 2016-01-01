import React, { Component } from 'react'

export default class Root extends Component{
  render() {
    return (
      <div>
        {this.props.children}
      </div>
    )
  }
}
