import React from 'react';
import classes from './Title.css';
const title=()=> {
    return(
    <div>
        
        <p className={classes.Title}><span style={{marginRight:"10px"}}> <i className="fa fa-comments" style={{fontSize:24,color:"red"}}></i> </span> HELP AND DISCUSSION DESK</p>
    </div>
    )
}

export default title;