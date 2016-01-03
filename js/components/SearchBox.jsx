import React, { PropTypes, Component } from 'react'

// Assets
import Search from '../../img/search.png'

export default class SearchBox extends Component{

  constructor(props, context) {
    super(props, context)
  }

  render() {

    return (
      <div
        className='search-container'>
        <div
          className='img-search-container'>
          <img
            className='img-search'
            src={Search}/>
        </div>
        <div
          className='input-search-container'>
          <input
            type='text'
            placeholder='Buscar'
            className='input-search'/>
        </div>
      </div>
    )
  }
}
