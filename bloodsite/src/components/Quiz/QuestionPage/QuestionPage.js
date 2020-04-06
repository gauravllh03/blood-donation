import React, { useState, useEffect } from 'react';
import Question from './Question/Question'
import QuestionCount from './QuestionCount/QuestionCount'
import AnswerOption from './AnswerOption/AnswerOption'
import classes from './QuestionPage.css'

const questionPage = (props) =>{

    const [timer,setTimer] = useState()

    useEffect(()=>{
      setTimer(props.timer)
    },[props.timer])

    useEffect(() => {
      timer > 0 &&  setTimeout(() => {
        setTimer(timer - 1)
      }, 1000);
      if(timer===0){
        props.onTimerEnds()
        setTimeout(()=>{
         setTimer(props.timer)
        },500)
      }
    }, [timer]);

    useEffect(()=>{
      return ()=>{
        clearTimeout()
      }
    },[])

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
            <p>{timer}</p>
            <div className={classes.hearts}>{hearts}</div>
          </span>
          <Question content={props.question} />
          <ul className={classes.answerOptions}>
            {props.answerOptions.map(renderAnswerOptions)}
          </ul>
        </div>
    );
}
export default questionPage;