import React from 'react';
import classes from './Question.css'
 const question = (props) =>{
    return (
        <p className={classes.question}>{props.content}</p>
      );
 }
 export default question;