import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as HomeActions from '../actions/HomeActions'
import * as videoActions from '../actions/videoActions'
import styles from '../../css/app.css'

// Material components
import RaisedButton from 'material-ui/lib/raised-button'

// Custom components
import ListVideo from './ListVideo'

@connect(state => state)
export default class Home extends Component {

  constructor(props, context) {
    super(props, context)
  }

  componentWillMount() {
    const { dispatch } = this.props
    const actions = bindActionCreators(videoActions, dispatch)
    actions.fetchVideos()
  }

  render() {
    const { title } = this.props

    return (
      <main>
        <h1 className={styles.text}>Welcome {title}!</h1>
        <input type='text' ref='input' />
        <RaisedButton
          primary={true}
          onClick={::this.handleClick}
          label='Cambiar' />
        <ListVideo videos={this.props.videoStore.data}/>
      </main>
    )
  }

  handleClick() {
    const { dispatch } = this.props
    const actions = bindActionCreators(HomeActions, dispatch)
    const node = findDOMNode(this.refs.input)
    const text = node.value.trim()
    actions.changeTitle(text)
    node.value = ''
  }

}
