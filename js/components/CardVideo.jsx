import React, { Component, PropTypes } from 'react'
import { Card, Paper, CardMedia, CardTitle } from 'material-ui'

import ImagePreloader from '../components/ImagePreloader.jsx'

import Style from '../../css/card-video.css'
import noImage from '../../img/no-image.jpg'

export default class CardVideo extends Component{

  constructor(props, context) {
    super(props, context)
  }

  static propTypes = {
    video: PropTypes.object.isRequired
  }

  render() {
    const { video } = this.props

    return (
      <li className={Style.lista}>
        <Paper
          zDepth={3}
          className={Style.paper}>
          <Card>
            <CardMedia overlay={<CardTitle title={video.name}/>}>
              <ImagePreloader src={video.cover_url} fallback={noImage}/>
            </CardMedia>
          </Card>
        </Paper>
      </li>
    )
  }
}
