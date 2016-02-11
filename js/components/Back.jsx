import React, { PropTypes, Component } from 'react'

// Material Components
import { FloatingActionButton } from 'material-ui'
import ArrowBack from 'material-ui/lib/svg-icons/navigation/arrow-back'

export default class Back extends Component{

  constructor(props, context) {
    super(props, context)
  }

  render() {
    const { buttonStyle, buttonClassName, contentClassName } = this.props

    return (
      <div className={contentClassName}>
        <FloatingActionButton
          secondary={true}
          style={buttonStyle}
          backgroundColor='rgba(0, 200, 230, 0.5)'
          style={{ backgroundColor: 'rgba(255, 255, 255, 0.5)' }}
          className={buttonClassName}
          iconStyle={{ zIndex: 4 }}
          onTouchTap={::this._handleBack}>
          <ArrowBack />
        </FloatingActionButton>
      </div>
    )
  }

  _handleBack() {
    this.props.history.goBack()
  }
}

Back.propTypes = {
  history         : PropTypes.object.isRequired,
  buttonStyle     : PropTypes.object,
  buttonClassName : PropTypes.string,
  contentClassName: PropTypes.string
}

Back.defaultProps = {
  buttonStyle     : {},
  buttonClassName : '',
  contentClassName: ''
}
