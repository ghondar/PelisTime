import React, { PropTypes, Component } from 'react'

// Material Components
import CircularProgress from 'material-ui/lib/circular-progress'

// CSS Styles
import '../../css/spinner.css'

export default class Spinner extends Component{

  constructor(props, context) {
    super(props, context)
  }

  render() {
    return (
      <div className='spinner-container'>
        <CircularProgress mode='indeterminate' size={2} />
      </div>
    )
  }
}
