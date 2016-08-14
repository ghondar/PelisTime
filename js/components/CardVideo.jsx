import React, { Component, PropTypes } from 'react'
import ReactImageFallback from 'react-image-fallback'

// Material Components
import { Card, CardMedia, CardTitle} from 'material-ui/Card'
import Paper from 'material-ui/Paper'

// Assets
import noImage from '../../img/no-image.jpg'
import loadingImage from '../../img/loading_spinner.gif'

const findParentheses = /(?:\(.*?\))/

export default class CardVideo extends Component{

  constructor(props, context) {
    super(props, context)
  }

  render() {
    const { video } = this.props
    const parsedName = video.name.split(findParentheses)[ 0 ].trim()
    const name = parsedName.length > 18 ? `${parsedName.substr(0, 15)}...` : parsedName

    return (
      <Paper
        zDepth={3}
        className='paper'
        onClick={::this._handleDetail}>
        <Card>
          <CardMedia
            overlay={<CardTitle
                      style={{ padding: 5 }}
                      titleStyle={{
                        fontSize : 20,
                        textAlign: 'center'
                      }}
                      title={name} />}>
            <ReactImageFallback
              src={video.cover_url}
              fallbackImage={noImage}
              initialImage={loadingImage}
              alt={video.name}
              className='image' />
          </CardMedia>
        </Card>
      </Paper>
    )
  }

  _handleDetail(e) {
    const { video } = this.props
    this.context.router.push({
      pathname : 'details',
      state    : {
        id   : video.id,
        image: video.cover_url
      }
    })
  }
}

CardVideo.propTypes = {
  video: PropTypes.object.isRequired
}

CardVideo.contextTypes = {
  router: PropTypes.object
}
