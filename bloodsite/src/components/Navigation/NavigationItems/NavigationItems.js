import React from 'react';
import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';
const navigationItems=(props)=>(
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/home"><i className="fa fa-home" style={{fontSize:24}}></i> Home</NavigationItem>
        <NavigationItem link="/donate"><i className="fa fa-tint" style={{fontSize:24}}></i>  Donate</NavigationItem>
        <NavigationItem link="/quiz"><i className="fa fa-question" style={{fontSize:24}}></i>  Quiz</NavigationItem>
        <NavigationItem link="/stats"><i className="fa fa-pie-chart" style={{fontSize:24}}></i> Statistics</NavigationItem>
        <NavigationItem link="/research"><i className="fa fa-university" style={{fontSize:24}}></i>  Research</NavigationItem>
        <NavigationItem link="/help"><i className="fa fa-comments-o" style={{fontSize:24}}></i>  Discuss</NavigationItem>
        
        {props.isAuthenticated ?
            <NavigationItem link="/logout"><i className="fa fa-sign-out" style={{fontSize:24}}></i>  Logout</NavigationItem>:
            null
        }
    </ul>
);

export default navigationItems;