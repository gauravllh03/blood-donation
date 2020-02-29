import React,{ Component } from "react";
import classes from './Quiz.css';
import {connect} from 'react-redux';
import { Redirect } from "react-router";
import quizQuestions from '../../assets/api/QuestionList';
import QuestionPage from './QuestionPage/QuestionPage';
import Result from './Result/Result';
import * as actions from '../../store/actions/index'

class Quiz extends Component
{
    constructor(props) {
        super(props);
      
        this.state = {
          lives:3,
          counter: 0,
          questionId: 1,
          question: '',
          answerOptions: [],
          answer: '',
          answersCount: {},
          result: '',
          email:localStorage.getItem('email'),
        };
        this.handleAnswerSelected = this.handleAnswerSelected.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit () {
        const templateId = 'template_j1qCyvOQ';
        this.sendFeedback(templateId, {reply_to: this.state.email, to_name:this.state.email});
    }

    sendFeedback (templateId, variables) {
    window.emailjs.send(
        'gmail', templateId,
        variables
        ).then(res => {
        console.log('Email successfully sent!')
        })
        // Handle errors here however you like, or use a React error boundary
        .catch(err => console.error('Oh well, you failed. Here some thoughts on the error that occured:', err))
    }
    componentDidMount() {
        const shuffledAnswerOptions = quizQuestions.map((question) => this.shuffleArray(question.answers));  
      
        this.setState({
          question: quizQuestions[0].question,
          answerOptions: shuffledAnswerOptions[0]
        });
    }
    shuffleArray(array) {
        var currentIndex = array.length, temporaryValue, randomIndex;
      
        // While there remain elements to shuffle...
        while (0 !== currentIndex) {
      
          // Pick a remaining element...
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex -= 1;
      
          // And swap it with the current element.
          temporaryValue = array[currentIndex];
          array[currentIndex] = array[randomIndex];
          array[randomIndex] = temporaryValue;
        }
      
        return array;
    };
    setUserAnswer(answer) {
        var lives=this.state.lives;
        if(answer==="Incorrect")
            lives-=1;
        this.setState((state) => ({
          answersCount: {
            ...state.answersCount,
            [answer]: (state.answersCount[answer] || 0) + 1
          },
          answer: answer,
          lives:lives,
        }));
        
        
    }
    handleAnswerSelected(event) {
        console.log(this.state.lives);
        this.setUserAnswer(event.currentTarget.value);
        if (this.state.questionId < quizQuestions.length && this.state.lives!==0) {
            setTimeout(() => this.setNextQuestion(), 300);
          } else {
            setTimeout(() => this.setResults(this.getResults()), 300);
          }
    }
    setNextQuestion() {
        const counter = this.state.counter + 1;
        const questionId = this.state.questionId + 1;
        this.setState({
          counter: counter,
          questionId: questionId,
          question: quizQuestions[counter].question,
          answerOptions: quizQuestions[counter].answers,
          answer: ''
        });
    }
    getResults() {
        const answersCount = this.state.answersCount;
        const answersCountKeys = Object.keys(answersCount);
        const answersCountValues = answersCountKeys.map((key) => answersCount[key]);
        const maxAnswerCount = Math.max.apply(null, answersCountValues);
      
        return answersCountKeys.filter((key) => answersCount[key] === maxAnswerCount);
    }
    setResults (result) {
        if (result.length === 1) {
          this.setState({ result: result[0] });
          this.handleSubmit();
        } else {
          this.setState({ result: 'Undetermined' });
        }
    }
    renderQuiz(){
        return (
                <QuestionPage
                    lives={this.state.lives}
                    answer={this.state.answer}
                    answerOptions={this.state.answerOptions}
                    questionId={this.state.questionId}
                    question={this.state.question}
                    questionTotal={quizQuestions.length}
                    onAnswerSelected={this.handleAnswerSelected}
                />
        );
    }
    renderResult(){
        return (
                <Result
                    quizResult={this.state.result}
                    answerOptions={this.state.answersCount}
                ></Result>
        );
    }
    render()
    {
        let redirect=null;
        if(!this.props.isAuthenticated)
        {
            redirect=<Redirect to="/"/>;
        }
        return <React.Fragment>
            {redirect}
                <p className={classes.para}>Play quiz friends</p>
            {!this.state.result?this.renderQuiz():this.renderResult()}
        </React.Fragment>;
    }
}

const mapStateToProps=state=>{
    return{
        isAuthenticated:state.token!==null,
        lives:state.lives
    };
}

const mapDispatchToProps=dispatch=>{
    return{
        onSub:(lives)=>dispatch(actions.subtract(lives))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Quiz);