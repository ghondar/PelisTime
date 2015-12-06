import React, { PropTypes, Component } from 'react'

export default class DescriptionVideo extends Component{

  constructor(props, context) {
    super(props, context)
  }

  static propTypes = {
    name    : PropTypes.string,
    plot    : PropTypes.string,
    duration: PropTypes.number,
    rating  : PropTypes.number,
    type    : PropTypes.string,
    year    : PropTypes.string,
    genre   : PropTypes.string
  }

  static defaultProps = {
    name    : 'No definido',
    plot    : 'Sin descripción.',
    duration: 0,
    rating  : 0.0,
    type    : 'Pelicula',
    year    : '',
    genre   : 'No defenido'
  }

  render() {
    const { name, plot, type, duration, year, rating, genre } = this.props

    return (
      <div>
        <h2>{name}</h2>
        <p>{plot}</p>
        <span>{type},</span>
        <span> {genre},</span>
        <span> {duration} minutos,</span>
        <span> {year},</span>
        <span> {rating}</span>
      </div>
    )
  }
}
