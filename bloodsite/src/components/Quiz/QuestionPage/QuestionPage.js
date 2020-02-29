import React from 'react';
import Question from './Question/Question'
import QuestionCount from './QuestionCount/QuestionCount'
import AnswerOption from './AnswerOption/AnswerOption'
import classes from './QuestionPage.css'

const questionPage = (props) =>{
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
      hearts.push(<i className="fa fa-heart" key={i} style={{color:"red"}}></i>);

    return (
        <div className={classes.quiz}>
          <span className={classes.header}>
            <QuestionCount
              className={classes.questionCount}
              counter={props.questionId}
              total={props.questionTotal}
              
            />
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