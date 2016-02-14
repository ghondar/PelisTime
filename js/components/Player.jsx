import React, { PropTypes, Component } from 'react'
import Wjs from 'wcjs-player'

// Custom Components
import Back from '../components/Back.jsx'

export default class Player extends Component{

  constructor(props, context) {
    super(props, context)
    this.onKeyDown = this.onKeyDown.bind(this)
    this.state = {
      hide   : true,
      timeout: null
    }
  }

  componentDidMount() {
    const { source, title } = this.props.location.state
    document.addEventListener('keydown', this.onKeyDown)

    this.player = new Wjs('#player').addPlayer({ autoplay: true })
    this.player.addPlaylist({
      url  : source,
      title: title
    })
  }

  componentWillUnmount() {
    const timeout = this.state.timeout

    document.removeEventListener('keydown', this.onKeyDown, false)

    if(timeout)
      clearTimeout(timeout)

    global.destroyVideo && global.destroyVideo()
    this.player.stop()
  }

  onKeyDown(e) {
    const keyCode = e.keyCode || e.which

    if (keyCode === 32) {
      e.preventDefault()
      this.togglePlay()
    }
  }

  togglePlay() {
    this.player.togglePause()
  }

  hideButton() {
    const timeout = this.state.timeout

    if(timeout)
      clearTimeout(timeout)
    this.setState({
      timeout: setTimeout(() => {
        this.setState({
          hide: true
        })
      }, 3000)
    })
  }

  showButton() {
    this.setState({
      hide: false
    })
    this.hideButton()
  }

  render() {

    return (
      <div
        onMouseLeave={::this._handlleMouseLeave}
        onMouseEnter={::this._handlleMouse}
        onMouseMove={::this._handlleMouse}
        className='player-container'>
        {this.state.hide ? null :
          <Back
            buttonClassName='player-button' />}
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
