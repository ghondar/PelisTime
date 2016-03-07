import React, { PropTypes, Component } from 'react'

const findParentheses = /(?:\(.*?\))/

export default class DescriptionVideo extends Component{

  constructor(props, context) {
    super(props, context)
  }

  render() {
    const { name, plot, type, duration, year, rating, genre } = this.props
    const nameParsed = name.split(findParentheses)[ 0 ].trim()

    return (
      <div className='disable-text-select'>
        <h2>{nameParsed}</h2>
        <div className='info-labels'>
          <div className='line clearfix'>
            <span className='label'><span translate>Genero:</span>{genre}</span>
            <span className='label'><span translate>Duración:</span>{duration}MIN</span>
            <span className='label last'><span translate>Rating:</span><span className='text'>{`${rating}/10`}</span></span>
          </div>
          <div className='line clearfix'>
            <span className='label'><span translate>Idioma:</span>Español</span>
            <span className='label'><span translate>Tipo:</span>{/(tv|serie.*)/.test(name.toLowerCase()) ? 'Serie' : 'Película'}</span>
            <span className='label last'><span translate>Año:</span><span className='text'>{year}</span></span>
          </div>
        </div>
        <div className='plot scroll-container'>
          <div className='scroll-box'>
            <p>{plot}</p>
          </div>
        </div>
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
