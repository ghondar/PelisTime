import React, { PropTypes, Component } from 'react'

// Material Components
import CircularProgress from 'material-ui/CircularProgress'

export default class Spinner extends Component{

  constructor(props, context) {
    super(props, context)
    this.state = {
      notFound: false
    }
  }

  componentDidMount() {
    const { videoStore, viewStore, simple } = this.props

    if(!simple) {
      const videos = videoStore[ viewStore.type + viewStore.view ]

      if(videos && !videos.Loading) {
        this.setState({
          notFound: false
        })
        this.timeout = setTimeout(() => {
          this.setState({
            notFound: true
          })
        }, 5000)
      }
    }
  }

  componentWillUnmount() {
    this.setState({
      notFound: false
    })
    if(this.timeout)
      clearTimeout(this.timeout)
  }

  render() {
    return (
      <div className='spinner-container'>
        {this.state.notFound ? <h2>No se encontro videos...</h2> : <CircularProgress mode='indeterminate' size={2} />}
      </div>
    )
  }
}
