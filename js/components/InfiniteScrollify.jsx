import React, {Component, PropTypes} from 'react'

export default function(InnerComponent) {
  class InfiniteScrollComponent extends Component {
    constructor(props) {
      super(props)
      this.onScroll = this.onScroll.bind(this)
    }

    componentDidMount() {
      window.addEventListener('scroll', this.onScroll, false)
    }

    componentWillUnmount() {
      window.removeEventListener('scroll', this.onScroll, false)
    }

    onScroll() {
      const { loading, fetchVideos, currentPage } = this.props

      if ((window.innerHeight + window.scrollY) >= (document.body.offsetHeight - 250)) {
        // this.props.dispatch(this.props.scrollFunc())
        if(!loading)
          fetchVideos(currentPage + 1)
      }
    }

    render() {
      return <InnerComponent {...this.props} />
    }
  }

  InfiniteScrollComponent.propTypes = {
    fetchVideos: PropTypes.func.isRequired,
    currentPage: PropTypes.number.isRequired,
    loading    : PropTypes.bool.isRequired
  }

  return InfiniteScrollComponent
}
