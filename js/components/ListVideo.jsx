import React, { PropTypes, Component } from 'react'
import masonry from 'react-masonry-component'
import InfiniteScrollify from './InfiniteScrollify.jsx'

// Custom components
import CardVideo from '../components/CardVideo.jsx'

// Material components
import GridList from 'material-ui/lib/grid-list/grid-list'
import GridTile from 'material-ui/lib/grid-list/grid-tile'
import CircularProgress from 'material-ui/lib/circular-progress'
// import RaisedButton from 'material-ui/lib/raised-button'

const Masonry = masonry(React)

class ListVideo extends Component{

  constructor(props, context) {
    super(props, context)

    this.state = {
      end          : this.props.videos.length,
      paddingBottom: 0,
      paddingTop   : 0,
      start        : 0
    }
  }

  static propTypes = {
    videos: PropTypes.array.isRequired
  }

  componentDidMount() {
    window.addEventListener('scroll', ::this.onScroll, false)
  }

  componentWillReceiveProps(nextProps) {
    const { end, paddingBottom, paddingTop, start } = this.getScrollState(nextProps)

    if (paddingTop !== this.state.paddingTop
    || paddingBottom !== this.state.paddingBottom
    || start !== this.state.start
    || end !== this.state.end) {
      this.setState({
        end          : end,
        paddingBottom: paddingBottom,
        paddingTop   : paddingTop,
        start        : start
      })
    }
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', ::this.onScroll, false)
  }

  getScrollState(props) {
    const { height, videos } = props

    const MARGIN_TOP = 20
    const ROW_HEIGHT = 132
    const ITEMS_PER_ROW = 5
    const scrollY = window.scrollY
    let paddingTop = 0
    let paddingBottom = 0
    let start = 0
    let end = videos.length

    if ((scrollY - ((ROW_HEIGHT * 3) + (MARGIN_TOP * 2))) > 0) {
      const rowsToPad = Math.floor((scrollY - ((ROW_HEIGHT * 2) + (MARGIN_TOP))) / (ROW_HEIGHT + MARGIN_TOP))
      paddingTop = rowsToPad * (ROW_HEIGHT + MARGIN_TOP)
      start = rowsToPad * ITEMS_PER_ROW
    }

    const rowsOnScreen = Math.ceil(window.innerHeight / (ROW_HEIGHT + MARGIN_TOP))
    const itemsToShow = (rowsOnScreen + 5) * ITEMS_PER_ROW

    if (videos.length > (start + itemsToShow)) {
      end = start + itemsToShow
      const rowsToPad = Math.ceil((videos.length - end) / ITEMS_PER_ROW)
      paddingBottom = rowsToPad * (ROW_HEIGHT + MARGIN_TOP)
    }

    return {
      end,
      paddingBottom,
      paddingTop,
      start
    }
  }

  onScroll() {
    const { end, paddingBottom, paddingTop, start } = this.getScrollState(this.props)

    if (paddingTop !== this.state.paddingTop
    || paddingBottom !== this.state.paddingBottom
    || end !== this.state.end
    || start !== this.state.start) {
      this.setState({
        end          : end,
        paddingBottom: paddingBottom,
        paddingTop   : paddingTop,
        start        : start
      })
    }
  }

  render() {
    const childElements = this.props.videos.map(video => (
      <CardVideo key={video.id} video={video}/>
    ))
    return (
      <Masonry
        ref='masonry'
        elementType={'ul'}
        disableImagesLoaded={false}
        scrollFunc={::this._handleScrollFunc}>
        {childElements.length ? childElements : <CircularProgress mode='indeterminate' color={'red'} size={2} />}
      </Masonry>
    )
  }

  _handleScrollFunc() {
    debugger
  }
}

export default InfiniteScrollify(ListVideo)
