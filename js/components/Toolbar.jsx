import React, { PropTypes, Component } from 'react'

// Custom components
import SearchBox from './SearchBox.jsx'

// Material Components
import AppBar from 'material-ui/lib/app-bar'
import LeftNav from 'material-ui/lib/left-nav'
import MenuItem from 'material-ui/lib/menus/menu-item'
import Divider from 'material-ui/lib/divider'
import List from 'material-ui/lib/lists/list'
import ListItem from 'material-ui/lib/lists/list-item'

const types = {
  Estrenos: 'releases',
  Popular : 'popular'
}

export default class Toolbar extends Component{

  constructor(props, context) {
    super(props, context)
    this.state = {
      open : false,
      title: Object.keys(types)[ 0 ]
    }
  }

  render() {
    return (
      <div>
        <AppBar
          title={this.state.title}
          onLeftIconButtonTouchTap={::this._handleToggle}
          style={{
            position: 'fixed',
            top     : 0,
            left    : 0,
            right   : 0
          }}>
          <SearchBox />
        </AppBar>
          <LeftNav
            docked={false}
            width={200}
            open={this.state.open}
            onRequestChange={open => this.setState({ open })}
          >
          <List>
            <ListItem
              primaryText='Peliculas'
              initiallyOpen={true}
              nestedItems={Object.keys(types).map((type) =>  (
                <ListItem
                  key={type}
                  primaryText={type}
                  onTouchTap={this._handleChangeView.bind(this, types[ type ])}/>
              ))}
            />
          </List>
        </LeftNav>
      </div>
    )
  }

  _handleChangeView(view) {
    const { setView, fetchVideos, videoStore } = this.props
    setView(view)
    if(!videoStore[ view ]) {
      fetchVideos(view, 1)
    }
    this.setState({
      open : !this.state.open,
      title: view
    })
  }

  _handleToggle() {
    this.setState({ open: !this.state.open })
  }

  _handleClose() {
    this.setState({ open: false })
  }
}
