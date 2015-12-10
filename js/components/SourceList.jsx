import React, { PropTypes, Component } from 'react'
import { playTorrent, readTorrent } from '../utils/playtorrent'

// Material Compoennts
import Table from 'material-ui/lib/table/table'
import TableBody from 'material-ui/lib/table/table-body'
import TableHeader from 'material-ui/lib/table/table-header'
import TableHeaderColumn from 'material-ui/lib/table/table-header-column'
import TableRow from 'material-ui/lib/table/table-row'
import TableRowColumn from 'material-ui/lib/table/table-row-column'
import { Dialog, FlatButton } from 'material-ui'

export default class SourceList extends Component{

  constructor(props, context) {
    super(props, context)
    this.state = {
      progressTorrent: {
        percent: 0.00,
        started: false,
        speed  : '0kb',
        active : 0,
        peers  : 0,
        timeout: false
      },
      open           : false
    }
  }

  static propTypes = {
    sources: PropTypes.array,
    name   : PropTypes.string
  }

  static defaultProps = {
    sources: [],
    name   : ''
  }

  render() {
    let standardActions = [
      <FlatButton
        key='cancel'
        label='Cancel'
        secondary={true}
        onTouchTap={::this._onDialogCancel} />
    ]
    const body = this.props.sources.map(source => (
      <TableRow key={source.nombre}>
        <TableRowColumn>{source.def}p</TableRowColumn>
        <TableRowColumn>{source.peso}</TableRowColumn>
        <TableRowColumn>{source.fecha}</TableRowColumn>
      </TableRow>
    ))
    let percent = `${this.state.progressTorrent.percent.toFixed(2).toString()}%`

    return (
      <div>
        <Dialog
          ref='dialog'
          title='Creando Buffer...'
          contentClassName='dialog'
          autoDetectWindowHeight={true}
          actions={standardActions}
          open={this.state.open}>
          {percent}
        </Dialog>
        <Table
          height='300px'
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
              <TableHeaderColumn tooltip='Calidad de Video'>Formato</TableHeaderColumn>
              <TableHeaderColumn tooltip='Peso'>Peso</TableHeaderColumn>
              <TableHeaderColumn tooltip='Fecha de Subida'>Subido</TableHeaderColumn>
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
        this.props.history.pushState({
          source: href,
          title : this.props.name
        }, 'player')
      }, err => {
        console.log(err)
      }, info => {
        this.setState({
          progressTorrent: info
        })
      })
  }

  _onDialogCancel() {
    global.destroyVideo && global.destroyVideo()
    this.setState({
      open: false
    })
  }
}
