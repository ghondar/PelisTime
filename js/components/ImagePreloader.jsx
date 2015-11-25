import React, { PropTypes, Component } from 'react'

let resolveImageCache = {}

export default class ImagePreloader extends Component{

  constructor(props, context) {
    super(props, context)
    this.state = {
      hasLoaded: false,
      mounted  : false
    }
  }

  componentDidMount() {
    this.setState({
      mounted: true
    })
    this.resolveImage()
  }

  componentWillReceiveProps(props) {
    var img = this.state.image

    if (img) {
      img.onload = null
      img.onerror = null
      img.onabort = null
    }
    this.resolveImage(props)
  }

  render() {
    return (
      <img
        className={this.props.className || ''}
        src={this.state.hasLoaded ? this.props.src : this.props.fallback}
      />
    )
  }

  resolveImage(props) {
    props = props || this.props
    const { src, anonymous } = props

    if (typeof resolveImageCache[ src ] === 'boolean' && this.state.mounted) {
      return this.setState({ hasLoaded: resolveImageCache[ src ] })
    }
    const image = new Image()
    if(anonymous) {
      image.crossOrigin = 'Anonymous'
    }

    image.onload = this.onLoad.bind(this)
    image.onabort = this.onError.bind(this)
    image.onerror = this.onError.bind(this)

    image.src = src

    if(image.complete || image.complete === undefined) {
      image.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw=='
      image.src = src
    }

    this.setState({ image: image })
  }

  onLoad() {
    if(this.state.mounted) {
      resolveImageCache[ this.props.src ] = true
      this.setState({ hasLoaded: true })
    }
  }
  onError(err) {
    if(this.state.mounted) {
      resolveImageCache[ this.props.src ] = false
      this.setState({ hasLoaded: false })
    }
  }
}
