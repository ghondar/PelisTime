import React, { PropTypes, Component } from 'react'

// Material components
import RaisedButton from 'material-ui/lib/raised-button'

export default class Page2 extends Component{

  constructor(props, context) {
    super(props, context)
  }

  render() {
    return (
      <div>
        <h1>pagina 2</h1>
        <RaisedButton
          label='ir a pagina 1'
          secondary={true}
          onClick={::this._handleClick}/>
      </div>
    )
  }

  _handleClick(e) {
    this.props.history.goBack()
  }
}
