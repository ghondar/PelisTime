import React, {Component, PropTypes} from 'react'

export default function(InnerComponent) {
  class InfiniteScrollComponent extends Component {
    constructor(props) {
      super(props)
      this.onScroll = this.onScroll.bind(this)
    }

    componentDidMount() {
      document.querySelector('#scroll').addEventListener('scroll', this.onScroll, false)
    }

    componentWillUnmount() {
      document.querySelector('#scroll').removeEventListener('scroll', this.onScroll, false)
    }

    onScroll() {
      const { loading, fetchVideos, fetchVideosSearch, currentPage, lastPage, viewStore, videoStore } = this.props
      const scroll = document.querySelector('#scroll')
      if ((window.innerHeight + scroll.scrollTop) >= document.querySelector('#ul').offsetHeight) {
        if(!loading && (currentPage < lastPage)) {
          if(viewStore.view === 'search') {
            fetchVideosSearch(videoStore[ viewStore.view ].words, currentPage + 1)
          }else {
            fetchVideos(viewStore.view, currentPage + 1)
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
