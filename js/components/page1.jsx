import React, { PropTypes, Component } from 'react'

// Material components
import RaisedButton from 'material-ui/lib/raised-button'

export default class Page1 extends Component{

  constructor(props, context) {
    super(props, context)
  }

  render() {
    return (
      <div>
        <h1>pagina 1</h1>
        <RaisedButton
          label='ir a pagina 2'
          primary={true}
          onClick={::this._handleClick}/>
      </div>
    )
  }

  _handleClick(e) {
    this.props.history.push('/page2')
  }
}
