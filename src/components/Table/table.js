import React from 'react';
import './table.css'
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import '../../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';

  class SelectBgColorTable extends React.Component {
    
    selectRowProp = {
        mode: 'checkbox',
        bgColor: '#b8eb92'
      };

    products = [{
        id: 1,
        name: "Product1",
        price: 120
    }, {
        id: 2,
        name: "Product2",
        price: 80
    }, {
        id:32,
        name: "Product2",
        price: 80
    }];

    render() {
      return (
        <BootstrapTable opctions = {{noDataText : 'sin datos'}} deleteRow = {  true  } data = {this.products} selectRow={ this.selectRowProp } bordered={ true}>
            <TableHeaderColumn dataField='id' isKey>Objetivos</TableHeaderColumn>
            <TableHeaderColumn dataField='name' >Descripción</TableHeaderColumn>
        </BootstrapTable>
      );
    }
  }
  export default SelectBgColorTable;