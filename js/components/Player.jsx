import React, { PropTypes, Component } from 'react'
import Wjs from 'wcjs-player'

// Custom Components
import Back from '../components/Back.jsx'

export default class Player extends Component{

  constructor(props, context) {
    super(props, context)
    this.state = {
      hide   : false,
      timeout: null
    }
  }

  componentDidMount() {
    const { source, title } = this.props.location.state
    this.player = new Wjs('#player').addPlayer({ autoplay: true })
    this.player.addPlaylist({
      url  : source,
      title: title
    })
  }

  componentWillUnmount() {
    const timeout = this.state.timeout

    if(timeout)
      clearTimeout(timeout)

    global.destroyVideo && global.destroyVideo()
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
        <Back
          buttonStyle={Style.button}
          buttonClassName='player-button' />
        <div
          id='player'
          className='player'></div>
      </div>
    )
  }

  _handlleMouse() {
    this.showButton()
  }

  _handlleMouseLeave() {
    this.hideButton()
  }
}
