import React, { PropTypes, Component } from 'react'

// Material Compoennts
import Table from 'material-ui/lib/table/table'
import TableBody from 'material-ui/lib/table/table-body'
import TableFooter from 'material-ui/lib/table/table-footer'
import TableHeader from 'material-ui/lib/table/table-header'
import TableHeaderColumn from 'material-ui/lib/table/table-header-column'
import TableRow from 'material-ui/lib/table/table-row'
import TableRowColumn from 'material-ui/lib/table/table-row-column'

export default class SourceList extends Component{

  constructor(props, context) {
    super(props, context)
  }

  static propTypes = {
    sources: PropTypes.array
  }

  static defaultProps = {
    sources: []
  }

  render() {
    const body = this.props.sources.map(source => (
      <TableRow key={source.nombre}>
        <TableRowColumn>{source.def}p</TableRowColumn>
        <TableRowColumn>{source.peso}</TableRowColumn>
        <TableRowColumn>{source.fecha}</TableRowColumn>
      </TableRow>
    ))
    return (
      <Table
        height='300px'
        fixedHeader={false}
        fixedFooter={false}
        selectable={false}
        multiSelectable={false}>
        <TableHeader enableSelectAll={false}>
          <TableRow>
            <TableHeaderColumn tooltip='Calidad de Video'>Formato</TableHeaderColumn>
            <TableHeaderColumn tooltip='Peso'>Peso</TableHeaderColumn>
            <TableHeaderColumn tooltip='Fecha de Subida'>Fecha</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody
          deselectOnClickaway={false}
          showRowHover={false}
          stripedRows={true}>
          {body}
        </TableBody>
      </Table>
    )
  }
}
