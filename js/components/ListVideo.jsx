import React, { PropTypes, Component } from 'react'

// Material components
import GridList from 'material-ui/lib/grid-list/grid-list'
import GridTile from 'material-ui/lib/grid-list/grid-tile'
// import RaisedButton from 'material-ui/lib/raised-button'

export default class ListVideo extends Component{

  constructor(props, context) {
    super(props, context)
  }

  static propTypes = {
    videos: PropTypes.array.isRequired
  }

  render() {
    return (
      <GridList
        cellHeight={200}
        cols={10}
        style={{
          position : 'absolute',
          top      : 0,
          bottom   : 0,
          right    : 0,
          left     : 0,
          overflowY: 'auto'
        }}>
        {
          this.props.videos.map(video => (
            <GridTile
              key={video.id}
              title={video.name}
              subtitle={<span>Año: <b>{video.year}</b></span>}
              >
              <img src={video.cover_url} />
            </GridTile>
          ))
        }
      </GridList>
    )
  }
}
