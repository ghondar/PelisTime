import React, { PropTypes, Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import ReactImageFallback from 'react-image-fallback'
import * as videoActions from '../actions/videoActions'

// Custom Components
import Spinner from '../components/Spinner.jsx'
import DescriptionVideo from '../components/DescriptionVideo.jsx'
import SourceList from '../components/SourceList.jsx'
import Back from '../components/Back.jsx'

// Assets
import noImage from '../../img/no-image.jpg'
import loadingImage from '../../img/loading_spinner.gif'

class DetailVideo extends Component{

  constructor(props, context) {
    super(props, context)
  }

  componentWillMount() {
    const { dispatch, detailStore, location } = this.props
    const { id } = location.state

    if(!detailStore[ id ])
      dispatch(videoActions.fetchDetail(id))
  }

  render() {
    const { id, image } = this.props.location.state
    const { name, plot, duration, rating, type, year, genre, sources, Loading } = this.props.detailStore[ id ] || { Loading : true }

    const childComponents = Loading ? <Spinner simple={true} /> : (
      <div className='container-description'>
        <img className='image-description' onDragStart={::this._handleDisableDrag} src={image} />
        <div className='container-right-description'>
          <DescriptionVideo
            name={name}
            plot={plot}
            duration={duration}
            rating={rating}
            type={type}
            year={year}
            genre={genre ? genre.name : ''}
          />
          <SourceList
            name={name}
            sources={sources}/>
        </div>
      </div>
    )

    return (
      <div className='description'>
        <ReactImageFallback
              src={image}
              fallbackImage={noImage}
              initialImage={loadingImage}
              className='cover-bg' />
        <div className='cover-shadow'/>
        <Back
          contentClassName='margin'/>
        {childComponents}
      </div>
    )
  }

  _handleDisableDrag(e) {
    e.preventDefault()
  }

  _handleBack(e) {
    this.context.router.goBack()
  }
}

DetailVideo.contextTypes = {
  router: PropTypes.object
}

export default connect(state => ({
  detailStore: state.detailStore
}))(DetailVideo)
