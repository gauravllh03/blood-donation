import React from 'react';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.css';
import Backdrop from '../../UI/Backdrop/Backdrop';
const sideDrawer=(props)=>{
    
    let attachedClasses=[classes.SideDrawer,classes.Close];
    if(props.open)
    {
        attachedClasses=[classes.SideDrawer,classes.Open];
    }
    return(
        <React.Fragment>
            <Backdrop show={props.open} clicked={props.closed}/>
            <div className={attachedClasses.join(' ')} onClick={props.closed}>

                    <div className={classes.Logo}><i className="fa fa-times-circle-o" style={{fontSize:36}}></i></div>

                    <div className={classes.Logo1}><i className="fa fa-tint" style={{fontSize:42,color:"red"}}></i>  <i className="fa fa-tint" style={{fontSize:42,color:"red"}}></i>  <i className="fa fa-tint" style={{fontSize:42,color:"red"}}></i></div>

                    <nav>
                        <NavigationItems isAuthenticated={props.isAuth}/>
                    </nav>
            
            </div>
            
        </React.Fragment>
    );
};
export default sideDrawer;