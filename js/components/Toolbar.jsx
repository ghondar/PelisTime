import React, { PropTypes, Component } from 'react'

// Custom components
import SearchBox from './SearchBox.jsx'

// Material Components
import AppBar from 'material-ui/AppBar'
import Drawer from 'material-ui/Drawer'
import MenuItem from 'material-ui/MenuItem'
import Divider from 'material-ui/Divider'
import { List, ListItem } from 'material-ui/List'

const sections = {
  movies : [
    {
      title: 'Estrenos',
      view : 'releases'
    }, {
      title: 'Popular',
      view : 'popular'
    }, {
      title: 'Ranking',
      view : 'ranking'
    }, {
      title: 'Todos',
      view : 'all'
    }
  ],
  tvshows: [
    {
      title: 'Nuevos Episodios',
      view : 'newepisodes'
    }, {
      title: 'Popular',
      view : 'popular'
    }, {
      title: 'Ranking',
      view : 'ranking'
    }, {
      title: 'Todos',
      view : 'all'
    }
  ]
}

const alias = {
  movies : 'Peliculas',
  tvshows: 'Series'
}

export default class Toolbar extends Component{

  constructor(props, context) {
    super(props, context)
    this._handleSize = this._handleSize.bind(this)
    this.state = {
      open  : false,
      title : sections.movies[ 0 ].title,
      drawer: {
        docked: false,
        style : {}
      }
    }
  }

  componentDidMount() {
    window.addEventListener('resize', this._handleSize, false)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this._handleSize, false)
  }

  render() {
    const { setView, clearVideos, videoStore, viewStore, fetchVideosSearch } = this.props

    return (
      <div>
        <AppBar
          title={viewStore.view === 'search' ? viewStore.title : `${alias[ viewStore.type ]} - ${viewStore.title}`}
          onLeftIconButtonTouchTap={::this._handleToggle}
          style={{
            position: 'fixed',
            top     : 0,
            left    : 0,
            right   : 0
          }}>
          <SearchBox
            ref='searchbox'
            clearVideos={clearVideos}
            setView={setView}
            videoStore={videoStore}
            viewStore={viewStore}
            fetchVideosSearch={fetchVideosSearch}/>
        </AppBar>
          <Drawer
            docked={this.state.drawer.docked}
            containerStyle={this.state.drawer.style}
            width={200}
            open={this.state.open}
            onRequestChange={open => this.setState({ open })}
          >
          <List>
            {Object.keys(sections).map((type, i) => (
              <ListItem
                key={i}
                primaryText={alias[ type ]}
                initiallyOpen={true}
                nestedItems={sections[ type ].map((section, index) => (
                  <ListItem
                    key={index}
                    primaryText={section.title}
                    onTouchTap={this._handleChangeView.bind(this, {
                      ...section,
                      type
                    })}/>
                ))}
              />
            ))}
          </List>
        </Drawer>
      </div>
    )
  }

  _handleSize() {
    if(screen.width >= window.outerWidth && window.outerWidth >= screen.width / 1.2) {
      this.setState({
        drawer: {
          ...this.state.drawer,
          docked: true,
          style: {
            top      : 68,
            boxShadow: 'none'
          }
        }
      })
    }else {
      this.setState({
        drawer: {
          ...this.state.drawer,
          docked: false,
          style: {}
        }
      })
    }
  }

  _handleChangeView(json) {
    const { setView, fetchVideos, videoStore } = this.props
    setView(json)
    this.refs.searchbox.refs.inputSearch.value = ''

    if(!videoStore[ json.type + json.view ]) {
      fetchVideos(json, 1)
    }
    this.setState({
      open : !this.state.open,
      title: json.title
    })
  }

  _handleToggle() {
    this._handleSize()
    this.setState({ open: !this.state.open })
  }
}
