import React, { PropTypes, Component } from 'react'
import torrentHealth from 'torrent-health'

// Material Components
import CircularProgress from 'material-ui/lib/circular-progress'

export default class HealthTorrent extends Component{

  constructor(props, context) {
    super(props, context)
    this.state = {
      loading: true,
      peers  : 0,
      seeds  : 0
    }
  }

  static propTypes = {
    url: PropTypes.string.isRequired
  }

  componentDidMount() {
    torrentHealth(this.props.url)
      .then(health => {
        this.setState(Object.assign({}, { loading: false }, health))
      })
      .catch(err => {
        this.setState({ loading: false })
      })
  }

  render() {
    const { seeds, peers, loading } = this.state

    return (
      <span>{loading ? <CircularProgress mode='indeterminate' size={0.3} /> : `Semillas: ${seeds} - Pares: ${peers}`}</span>
    )
  }
}
