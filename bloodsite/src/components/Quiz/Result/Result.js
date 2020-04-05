import React from 'react';
import classes from './Result.css';
import {Redirect} from 'react-router'; 
import { CircularProgressbar,buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import Button from '../../UI/Button/Button'
function Result(props) {
  console.log(props.answerOptions);
  const correctPer=(props.answerOptions["Correct"]?props.answerOptions["Correct"]:0)/5*100;
  const incorrectPer=(props.answerOptions["Incorrect"]?props.answerOptions["Incorrect"]:0)/5*100;

  const donateBlood=()=>{
      <Redirect to="/donate"/>
  }
  let winEmail = null
  if(props.quizResult==='Correct')
    winEmail=<p>Check your email for your surprise</p>

  return (
    <div className={classes.result}>
      <div className={classes.per}>
        <div className={classes.correctPer}>
        Correct Answers <CircularProgressbar 
          styles={buildStyles({
            // Rotation of path and trail, in number of turns (0-1)
            rotation: 0.25,
        
            // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
            strokeLinecap: 'butt',
        
            // Text size
            textSize: '16px',
        
            // How long animation takes to go from one percentage to another, in seconds
            pathTransitionDuration: 0.5,
        
            // Can specify path transition in more detail, or remove it entirely
            // pathTransition: 'none',
        
            // Colors
            pathColor: `rgba(62, 152, 199,200)`,
            textColor: 'red',
            trailColor: '#d6d6d6',
            backgroundColor: 'salmon',
          })}
          background="true" value={correctPer} text={`${correctPer}%`} /></div>
        <div className={classes.incorrectPer}>Incorrect Answers <CircularProgressbar 
          styles={buildStyles({
            // Rotation of path and trail, in number of turns (0-1)
            rotation: 0.25,
        
            // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
            strokeLinecap: 'butt',
        
            // Text size
            textSize: '16px',
        
            // How long animation takes to go from one percentage to another, in seconds
            pathTransitionDuration: 0.5,
        
            // Can specify path transition in more detail, or remove it entirely
            // pathTransition: 'none',
        
            // Colors
            pathColor: `rgba(62, 152, 199,200)`,
            textColor: 'red',
            trailColor: '#d6d6d6',
            backgroundColor: 'salmon',
          })}
          background="true"  value={incorrectPer} text={`${incorrectPer}%`}></CircularProgressbar></div> 
      </div>
      <div className={classes.getLives}>
        <p>Your remaining lives: {props.lives}</p>
        <Button clicked={donateBlood()}>Get Lives!!!</Button>
      </div>
        {winEmail}
      </div>
      
      
  );
}

export default Result;