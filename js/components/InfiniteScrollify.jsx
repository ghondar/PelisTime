import React, {Component, PropTypes} from 'react'

export default function(InnerComponent) {
  class InfiniteScrollComponent extends Component {
    constructor(props) {
      super(props)
    }

    componentDidMount() {
      window.addEventListener('scroll', ::this.onScroll, false)
    }

    componentWillUnmount() {
      window.removeEventListener('scroll', ::this.onScroll, false)
    }

    onScroll() {
      if ((window.innerHeight + window.scrollY) >= (document.body.offsetHeight - 100)) {
        this.props.scrollFunc()
      }
    }

    render() {
      return <InnerComponent {...this.props} />
    }
  }

  InfiniteScrollComponent.propTypes = {
    scrollFunc: PropTypes.func.isRequired
  }

  return InfiniteScrollComponent
}
