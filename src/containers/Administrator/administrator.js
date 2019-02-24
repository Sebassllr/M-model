import React, { Component } from 'react'
import classes from './administrator.module.css';
import LeftComponent from '../../components/leftComponent/leftComponent';
import RightComponent from '../../components/RightComponent/rightComponent';

class Administrator extends Component {

    render(){
        return(
            <div className={[classes.greyBackground, classes.fullHeight, "displayFlex"].join(" ")}>
                <LeftComponent/>
                <RightComponent/>
            </div>
        )
    }

}

export default Administrator;