import React, { PropTypes, Component } from 'react'
import { playTorrent, readTorrent } from '../utils/playtorrent'

// Custom Components
import HealthTorrent from '../components/HealthTorrent.jsx'

// Material Compoennts
import Table from 'material-ui/lib/table/table'
import TableBody from 'material-ui/lib/table/table-body'
import TableHeader from 'material-ui/lib/table/table-header'
import TableHeaderColumn from 'material-ui/lib/table/table-header-column'
import TableRow from 'material-ui/lib/table/table-row'
import TableRowColumn from 'material-ui/lib/table/table-row-column'
import LinearProgress from 'material-ui/lib/linear-progress'
import { Dialog, FlatButton } from 'material-ui'

const progressTorrent = {
  percent: 0.00,
  started: false,
  speed  : '0.0',
  active : 0,
  peers  : 0,
  timeout: false
}

export default class SourceList extends Component{

  constructor(props, context) {
    super(props, context)
    this.state = {
      progressTorrent,
      open: false
    }
  }

  render() {
    let standardActions = [
      <FlatButton
        key='cancel'
        label='Cancel'
        secondary={true}
        onTouchTap={::this._onDialogCancel} />
    ]
    const body = this.props.sources.map((source, key) => {
      const name = /([^\/]+(torrent)$|$)/.exec(source.nombre)[ 0 ].split('.torrent')[ 0 ]

      return (
      <TableRow
          style={{ color: 'rgba(250, 250, 250, 0.9)' }}
          key={key}>
        <TableRowColumn>{name}</TableRowColumn>
        <TableRowColumn>{source.def}p</TableRowColumn>
        <TableRowColumn>{source.peso}</TableRowColumn>
        <TableRowColumn>{source.fecha}</TableRowColumn>
        <TableRowColumn><HealthTorrent url={source.url} /></TableRowColumn>
      </TableRow>
    )
    })
    const { percent, speed, peers } = this.state.progressTorrent
    let percentParsed = `${percent.toFixed(2)}%`

    const progress = (
      <LinearProgress style={{ marginBottom: 20 }} mode='determinate' value={percent} />
    )

    return (
      <div className='container-source-list'>
        <Dialog
          ref='dialog'
          contentClassName='dialog-source-list'
          contentStyle={{ width: 300 }}
          title='Creando Buffer...'
          autoDetectWindowHeight={true}
          actions={standardActions}
          open={this.state.open}>
          {progress}
          {parseInt(speed) ? speed : '0KB'}/s
        </Dialog>
        <Table
          height='300px'
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
          onCellClick={::this._handleRowSelection}
          fixedHeader={true}
          fixedFooter={false}
          selectable={false}
          multiSelectable={false}>
          <TableHeader
            adjustForCheckbox={false}
            displaySelectAll={false}
            selectAllSelected={false}
            enableSelectAll={false}>
            <TableRow>
              <TableHeaderColumn tooltip='Nombre'>Nombre</TableHeaderColumn>
              <TableHeaderColumn tooltip='Calidad de Video'>Formato</TableHeaderColumn>
              <TableHeaderColumn tooltip='Peso'>Peso</TableHeaderColumn>
              <TableHeaderColumn tooltip='Fecha de Subida'>Subido</TableHeaderColumn>
              <TableHeaderColumn tooltip='Salud del Torrent'>Salud</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody
            allRowsSelected={false}
            displayRowCheckbox={false}
            deselectOnClickaway={false}
            showRowHover={true}
            selectable={false}
            stripedRows={true}>
            {body}
          </TableBody>
        </Table>
      </div>
    )
  }

  _handleRowSelection(rowNumber, columnId) {
    this.setState({
      open: true
    })
    readTorrent(this.props.sources[ rowNumber ].url)
      .then(playTorrent)
      .then(href => {
        this.context.router.push({
          pathname : 'player',
          state    : {
            source: href,
            title : this.props.name
          }
        })
      }, err => {
        this._onDialogCancel.call(this)
      }, info => {
        this.setState({
          progressTorrent: info
        })
      })
  }

  _onDialogCancel() {
    global.destroyVideo && global.destroyVideo()
    this.setState({
      open: false,
      progressTorrent
    })
  }
}

SourceList.propTypes = {
  sources: PropTypes.array,
  name   : PropTypes.string
}

SourceList.defaultProps = {
  sources: [],
  name   : ''
}

SourceList.contextTypes = {
  router: PropTypes.object
}
