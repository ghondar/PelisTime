import React, { PropTypes, Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import ReactImageFallback from 'react-image-fallback'
import * as videoActions from '../actions/videoActions'

// Custom Components
import Spinner from '../components/Spinner.jsx'
import DescriptionVideo from '../components/DescriptionVideo.jsx'
import SourceList from '../components/SourceList.jsx'

// Assets
import noImage from '../../img/no-image.jpg'
import loadingImage from '../../img/loading_spinner.gif'

// Material Compoennts
import RaisedButton from 'material-ui/lib/raised-button'

@connect(state => ({
  detailStore: state.detailStore
}))
export default class DetailVideo extends Component{

  constructor(props, context) {
    super(props, context)
  }

  componentWillMount() {
    const { dispatch, detailStore, location } = this.props
    const { id } = location.state
    dispatch(videoActions.fetchDetail(id))
  }

  render() {
    const { name, plot, duration, rating, type, year, genre, sources, Loading } = this.props.detailStore

    const childComponents = Loading ? <Spinner /> : (
      <div>
        <DescriptionVideo
          name={name}
          plot={plot}
          duration={duration}
          rating={rating}
          type={type}
          year={year}
          genre={genre.name}
        />
        <SourceList sources={sources} />
      </div>
    )

    return (
      <div className='description'>
        <ReactImageFallback
              src={this.props.location.state.image}
              fallbackImage={noImage}
              initialImage={loadingImage}
              className='cover-bg' />
        <div className='cover-shadow'/>
        <RaisedButton
          label='Atras'
          secondary={true}
          onTouchTap={::this._handleBack}/>
        {childComponents}
      </div>
    )
  }

  _handleBack(e) {
    this.props.history.goBack()
  }
}
