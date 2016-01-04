import React, { PropTypes, Component } from 'react'

export default class PointStatus extends Component{

  constructor(props, context) {
    super(props, context)
    this.state = {
      color: 'red'
    }
  }

  componentWillMount() {
    const { peers, seeds } = this.props

    if(peers > 50 && seeds > 30) {
      this.setState({
        color: '#009E1D'
      })
    }else if(peers > 10 && seeds > 20) {
      this.setState({
        color: '#FFE900'
      })
    }
  }

  render() {
    return (
      <div style={{
        width          : 10,
        height         : 10,
        position       : 'relative',
        boxShadow      : '1px 1px 0.5px #888888',
        left           : 21,
        borderRadius   : '50%',
        backgroundColor: this.state.color,
        textAlign      : 'center'
      }}></div>
    )
  }
}
