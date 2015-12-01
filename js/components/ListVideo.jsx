import React, { PropTypes, Component } from 'react'
import masonry from 'react-masonry-component'
import InfiniteScrollify from './InfiniteScrollify.jsx'

// Custom components
import CardVideo from './CardVideo.jsx'
import Spinner from './Spinner.jsx'

// Material components
import GridList from 'material-ui/lib/grid-list/grid-list'
import GridTile from 'material-ui/lib/grid-list/grid-tile'
import CircularProgress from 'material-ui/lib/circular-progress'
// import RaisedButton from 'material-ui/lib/raised-button'

// CSS Styles
import '../../css/grid.css'
import '../../css/videos.css'

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
    const ROW_HEIGHT = 445
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

  onScroll(e) {
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

  renderVideos(start, end) {
    const chunk = 5
    const { videos } = this.props
    let result = []

    for (let i = start; i < end; i += chunk) {
      let videoList = videos.slice(i, i + chunk).map((video, j) => (
          <div className='col-1-5 clearfix' key={video.id}>
            <div className='video'>
              <CardVideo video={video} history={this.props.history}/>
            </div>
          </div>
        )
      )
      result.push(<div className='videos-row grid' key={'videos-row-' + i}>{videoList}</div>)
    }

    return result
  }

  render() {
    const { videos } = this.props
    const { end, paddingBottom, paddingTop, start } = this.state

    return (
      <Masonry
        ref='masonry'
        elementType={'ul'}
        className='content'
        disableImagesLoaded={false}>
        <div className='padder' style={{ height: paddingTop }}></div>
          {this.renderVideos(start, end)}
        <div className='padder' style={{ height: paddingBottom }}></div>
        {this.props.videoStore.Loading ? <Spinner /> : null}
      </Masonry>
    )
  }
}

export default InfiniteScrollify(ListVideo)
