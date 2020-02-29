import React from 'react';
import classes from './AnswerOption.css'

function AnswerOption(props) {
  return (
    <li className={classes.answerOption}>
      <input
        type="radio"
        className={classes.radioCustomButton}
        name="radioGroup"
        checked={props.answerType === props.answer}
        id={props.answerType}
        value={props.answerType}
        disabled={props.answer}
        onChange={props.onAnswerSelected}
      />
      <label className={classes.radioCustomLabel} htmlFor={props.answerType}>
        {props.answerContent}
      </label>
    </li>
  );
}

export default AnswerOption;