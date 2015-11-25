import React, { Component, PropTypes } from 'react'
import { Card, Paper, CardMedia, CardTitle } from 'material-ui'

import Style from '../../css/card-video.css'

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
              <img src={video.cover_url}/>
            </CardMedia>
          </Card>
        </Paper>
      </li>
    )
  }
}
