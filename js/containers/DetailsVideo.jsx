import React, { PropTypes, Component } from 'react'

// Material Compoennts
import RaisedButton from 'material-ui/lib/raised-button'

export default class DetailsVideo extends Component{

  constructor(props, context) {
    super(props, context)
  }

  render() {
    return (
      <div>
        <h1>Hola Detalle</h1>
        <RaisedButton
          label='Atras'
          secondary={true}
          onTouchTap={::this._handleBack}/>
      </div>
    )
  }

  _handleBack(e) {
    this.props.history.goBack()
  }
}
