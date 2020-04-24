import React, { useState, useEffect } from 'react';
import Question from './Question/Question'
import QuestionCount from './QuestionCount/QuestionCount'
import AnswerOption from './AnswerOption/AnswerOption'
import classes from './QuestionPage.css'
import {connect} from 'react-redux';
import * as actions from '../../../store/actions/index';

const questionPage = (props) =>{
    //const [timer,setTimer] = useState()

    // useEffect(()=>{
    //   setTimer(props.timer)
    //   console.log("Component updated");
    // },[props.timer])

    

    useEffect(() => {
      props.timer>0 && setTimeout(() => {
          props.onReduceTimer(props.timer);
      }, 1000);

      if(props.timer===0){
        props.onTimerEnds()
      }
    }, [props.timer]);

    function renderAnswerOptions(key) {
        return (
          <AnswerOption
            key={key.content}
            answerContent={key.content}
            answerType={key.type}
            answer={props.answer}
            questionId={props.questionId}
            onAnswerSelected={props.onAnswerSelected}
          />
        );
    }
    var hearts=[];
    for(let i=0;i<props.lives;i++)
      hearts.push(<i className="fa fa-heart" key={i} style={{color:"red",padding:"5px"}}></i>);
    return (
        <div className={classes.quiz}>
          <span className={classes.header}>
            <QuestionCount
              className={classes.questionCount}
              counter={props.questionId}
              total={props.questionTotal}
            />
            <div className={classes.timer}>
              <p className={classes.para}>{props.timer}</p>
            </div>
            <div className={classes.hearts}>{hearts}</div>
          </span>
          <Question content={props.question} />
          <ul className={classes.answerOptions}>
            {props.answerOptions.map(renderAnswerOptions)}
          </ul>
        </div>
    );
}

const mapStateToProps=(state)=>{
  return{
      timer:state.timer
    }
}
const mapDispatchToProps=dispatch=>{
  return{
      onReduceTimer:(time)=>dispatch(actions.subtractTime(time)),
      
  };
}


export default connect(mapStateToProps,mapDispatchToProps)(questionPage);