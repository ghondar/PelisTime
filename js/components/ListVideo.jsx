import React, { PropTypes, Component } from 'react'
import masonry from 'react-masonry-component'

// Custom components
import CardVideo from '../components/CardVideo'

// Material components
import GridList from 'material-ui/lib/grid-list/grid-list'
import GridTile from 'material-ui/lib/grid-list/grid-tile'
// import RaisedButton from 'material-ui/lib/raised-button'

const Masonry = masonry(React)

export default class ListVideo extends Component{

  constructor(props, context) {
    super(props, context)
  }

  static propTypes = {
    videos: PropTypes.array.isRequired
  }

  render() {
    const childElements = this.props.videos.map(video => (
      <CardVideo key={video.id} video={video}/>
    ))
    return (
      <Masonry
        elementType={'ul'}
        disableImagesLoaded={false}>
        {childElements}
      </Masonry>
    )
  }
}
