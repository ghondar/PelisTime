import React, { PropTypes, Component } from 'react'

// Material components
import Dialog from 'material-ui/lib/dialog'

let standardActions = [
  {
    text: 'Cancel'
  }
]

export default class PopupDownload extends Component{

  constructor(props, context) {
    super(props, context)
    this.state = {
      open: false
    }
  }

  static propTypes = {
    percent: PropTypes.number,
    started: PropTypes.bool,
    speed  : PropTypes.string,
    active : PropTypes.number,
    peers  : PropTypes.number,
    timeout: PropTypes.bool
  }

  static defaultProps = {
    percent: 0.00,
    started: false,
    speed  : '0kb',
    active : 0,
    peers  : 0,
    timeout: false
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.started)
      ::this._handleRequestClose()
  }

  show() {
    this.refs.dialog.show()
  }

  dismiss() {
    this.refs.dialog.dismiss()
  }

  render() {
    return (
      <Dialog
        ref='dialog'
        title='Creando Buffer...'
        actions={standardActions}
        open={this.state.open}
        onRequestClose={::this._handleRequestClose}>
        {this.props.percent.toFixed(2)}%
      </Dialog>
    )
  }

  _handleRequestClose() {
    global.destroyVideo()
    this.setState({
      open: false
    })
  }

}
