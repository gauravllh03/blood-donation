import React from 'react';
import burgerLogo from '../../assets/images/blood.jfif';
import classes from './Logo.css';
const logo=(props)=>{
    return (
        <div className={classes.Logo}>
            <img src={burgerLogo} alt="burgersite"/>
        </div>
    );
}

export default logo;