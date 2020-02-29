import React from 'react';
import classes from './QuestionCount.css'

function QuestionCount(props) {
  return (
    <div className={classes.questionCount}>
      Question <span>{props.counter}</span> of <span>{props.total}</span>
    </div>
  );
}

export default QuestionCount;