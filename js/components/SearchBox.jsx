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
            ref='inputSearch'
            onClick={::this._handleClick}
            onKeyUp={::this._handleSearch}
            type='text'
            placeholder='Buscar'
            className='input-search'/>
        </div>
      </div>
    )
  }

  _handleClick(e) {
    const { viewStore, setView } = this.props
    e.target.value = ''

    if(viewStore.view !== 'search') {
      this.props.clearVideos('search')
      this.props.setView({
        title: 'Buscar',
        view : 'search'
      })
    }
  }

  _handleSearch(e) {
    const { fetchVideosSearch, clearVideos } = this.props

    if (e.keyCode === 13) {
      const value = e.target.value.trim()
      if(value.length > 0) {
        clearVideos('search')
        fetchVideosSearch(value, 1)
      }
    }
  }
}
