import React, {Component, PropTypes} from 'react'

export default function(InnerComponent) {
  class InfiniteScrollComponent extends Component {
    constructor(props) {
      super(props)
      this.onScroll = this.onScroll.bind(this)
      this.state = {
        zoom: 1
      }
      this.mq = null
    }

    componentDidMount() {
      document.querySelector('#scroll').addEventListener('scroll', this.onScroll, false)
      if(window.matchMedia) {
        this.mq = window.matchMedia('(max-width: 765px)')
        this.mq.addListener(this.WidhChange.bind(this))
        this.WidhChange.call(this, this.mq)
      }
    }

    componentWillUnmount() {
      document.querySelector('#scroll').removeEventListener('scroll', this.onScroll, false)
      this.mq.removeListener(this.WidhChange.bind(this))
    }

    WidhChange(mq) {
      this.setState({
        zoom: mq.matches ? 0.6 : 1
      })
    }

    onScroll() {
      const { loading, fetchVideos, fetchVideosSearch, currentPage, lastPage, viewStore, videoStore } = this.props
      const scroll = document.querySelector('#scroll')
      if ((window.innerHeight + scroll.scrollTop) >= document.querySelector('#ul').offsetHeight * this.state.zoom) {
        if(!loading && (currentPage < lastPage)) {
          if(viewStore.view === 'search') {
            fetchVideosSearch(videoStore[ viewStore.type + viewStore.view ].words, currentPage + 1)
          }else {
            fetchVideos(viewStore, currentPage + 1)
          }
        }
      }
    }

    render() {
      return <InnerComponent {...this.props} />
    }
  }

  InfiniteScrollComponent.propTypes = {
    fetchVideos      : PropTypes.func.isRequired,
    fetchVideosSearch: PropTypes.func.isRequired,
    currentPage      : PropTypes.number.isRequired,
    lastPage         : PropTypes.number.isRequired,
    loading          : PropTypes.bool.isRequired,
    viewStore        : PropTypes.object.isRequired
  }

  return InfiniteScrollComponent
}
