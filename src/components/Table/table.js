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

      const products = [{
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

      return (
        <BootstrapTable 
          options={
            {
              noDataText : 'sin datos',
              deleteText: " ",
            }
          } 
          deleteRow={  true  } 
          data={ products } 
          selectRow={ selectRowProp } 
          bordered={true}
          btnText="HOLAAAA">
            <TableHeaderColumn dataField='id' isKey>Objetivos</TableHeaderColumn>
            <TableHeaderColumn dataField='name' >Descripción</TableHeaderColumn>
        </BootstrapTable>
      );
    }
  }
  export default SelectBgColorTable;