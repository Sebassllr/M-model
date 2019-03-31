import React from 'react';
import './table.css'
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import '../../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';

class SelectBgColorTable extends React.Component {

  render() {
          
    const selectRowProp = {
        mode: 'checkbox',
        bgColor: '#b8eb92'
    };
    console.log(this.props.data);
    return (
      <BootstrapTable 
        options={
          {
            noDataText : 'Sin datos',
            deleteText: " ",
          }
        }
        deleteRow={  true  } 
        data={ this.props.data } 
        selectRow={ selectRowProp } 
        bordered={false}>
          <TableHeaderColumn dataField='_id' isKey>ID</TableHeaderColumn>
          <TableHeaderColumn dataField='name'>Nombre</TableHeaderColumn>
      </BootstrapTable>
    );
  }
}
export default SelectBgColorTable;