import React, { PropTypes, Component } from 'react'
import Wjs from 'wcjs-player'

// Material Components
import FloatingActionButton from 'material-ui/lib/floating-action-button'
import ArrowBack from 'material-ui/lib/svg-icons/navigation/arrow-back'

export default class Player extends Component{

  constructor(props, context) {
    super(props, context)
    this.state = {
      hide   : false,
      timeout: null
    }
  }

  componentDidMount() {
    this.player = new Wjs('#player').addPlayer({ autoplay: true })
    this.player.addPlaylist(this.props.location.state.source)
  }

  componentWillUnmount() {
    const timeout = this.state.timeout

    if(timeout)
      clearTimeout(timeout)

    this.player.stop()
  }

  hideButton() {
    const timeout = this.state.timeout

    if(timeout)
      clearTimeout(timeout)
    this.setState({
      timeout: setTimeout(() => {
        this.setState({
        hide: false
      })
      }, 3000)
    })
  }

  showButton() {
    this.setState({
      hide: true
    })
    this.hideButton()
  }

  render() {
    const Style = {
      button: {
        display: 'none'
      }
    }

    if(this.state.hide) {
      Object.assign(Style.button, {
        display: 'inline-block'
      })
    }

    return (
      <div
        onMouseLeave={::this._handlleMouseLeave}
        onMouseEnter={::this._handlleMouse}
        onMouseMove={::this._handlleMouse}
        className='player-container'>
        <FloatingActionButton
          secondary={true}
          style={Style.button}
          backgroundColor='rgba(0, 200, 230, 0.5)'
          className='player-button'
          iconStyle={{ zIndex: 4 }}
          onTouchTap={::this._handleBack}>
          <ArrowBack />
        </FloatingActionButton>
        <div
          id='player'
          className='player'></div>
      </div>
    )
  }

  _handleBack() {
    this.props.history.goBack()
  }

  _handlleMouse() {
    this.showButton()
  }

  _handlleMouseLeave() {
    this.hideButton()
  }
}
