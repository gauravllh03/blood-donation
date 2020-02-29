import React from 'react';
import classes from './Question.css'
 const question = (props) =>{
    return (
        <h2 className={classes.question}>{props.content}</h2>
      );
 }
 export default question;