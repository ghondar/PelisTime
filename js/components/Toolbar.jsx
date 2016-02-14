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
    this.onResize = this.onResize.bind(this)
    this.state = {
      open   : false,
      title  : sections.movies[ 0 ].title,
      leftNav: {
        docked: false,
        style : {}
      }
    }
  }

  componentDidMount() {
    window.addEventListener('resize', this.onResize, false)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onResize, false)
  }

  onResize() {
    this._handleSize()
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
          <LeftNav
            docked={this.state.leftNav.docked}
            style={this.state.leftNav.style}
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
        </LeftNav>
      </div>
    )
  }

  _handleSize() {
    if(screen.width > window.outerWidth && window.outerWidth > screen.width / 1.2) {
      this.setState({
        leftNav: {
          ...this.state.leftNav,
          docked: true,
          style: {
            top      : 68,
            boxShadow: 'none'
          }
        }
      })
    }else {
      this.setState({
        leftNav: {
          ...this.state.leftNav,
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
