import React, { PropTypes, Component } from 'react'

export default class DescriptionVideo extends Component{

  constructor(props, context) {
    super(props, context)
  }

  render() {
    const { name, plot, type, duration, year, rating, genre } = this.props

    return (
      <div className='disable-text-select'>
        <h2>{name}</h2>
        <p>{plot}</p>
        <span>{type},</span>
        <span> {genre},</span>
        <span> {duration} minutos,</span>
        <span> {year},</span>
        <span> {rating}/10</span>
      </div>
    )
  }
}

DescriptionVideo.propTypes = {
  name    : PropTypes.string,
  plot    : PropTypes.string,
  duration: PropTypes.number,
  rating  : PropTypes.number,
  type    : PropTypes.string,
  year    : PropTypes.string,
  genre   : PropTypes.string
}

DescriptionVideo.defaultProps = {
  name    : 'No definido',
  plot    : 'Sin descripción.',
  duration: 0,
  rating  : 0.0,
  type    : 'Pelicula',
  year    : '',
  genre   : 'No defenido'
}
