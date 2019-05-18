import React, { Component } from 'react'
import Input from '../../../components/Input/input';

class GraphModels extends Component{

    

    render(){
        return(
            <div>
                <Input style={{height: 'unset'}} name="Modelos" type='select' options={this.props.models}/>
            </div>
        )
    }

}

export default GraphModels;