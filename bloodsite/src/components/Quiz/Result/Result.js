import React from 'react';
import classes from './Result.css';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
function Result(props) {
  console.log(props.answerOptions);
  const correctPer=(props.answerOptions["Correct"]?props.answerOptions["Correct"]:0)/5*100;
  const incorrectPer=(props.answerOptions["Incorrect"]?props.answerOptions["Incorrect"]:0)/5*100;
  return (
    <div className={classes.result}>
      Correct Answers <CircularProgressbar value={correctPer} text={`${correctPer}%`} />;<br/>
      Incorrect Answers <CircularProgressbar value={incorrectPer} text={`${incorrectPer}%`} />;
    </div>
  );
}

export default Result;