import React,{ Component } from "react";
import classes from './Quiz.css';
import {connect} from 'react-redux';
import { Redirect } from "react-router";
import quizQuestions from '../../assets/api/QuestionList';
import QuestionPage from './QuestionPage/QuestionPage';
import Result from './Result/Result';
import axios from 'axios';
import * as actions from '../../store/actions/index';

class Quiz extends Component
{
    constructor(props) {
        super(props);
      
        this.state = {
          lives:null,
          counter: 0,
          questionId: 1,
          question: '',
          answerOptions: [],
          answer: '',
          answersCount: {},
          result: '',
          email:localStorage.getItem('email'),
        //   timer:10
        };
        this.handleAnswerSelected = this.handleAnswerSelected.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.timerEnds=this.timerEnds.bind(this)
    }
    handleSubmit () {
        // const templateId = 'template_j1qCyvOQ';
        //this.sendFeedback(templateId, {reply_to: this.state.email, to_name:this.state.email});
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
    async componentDidMount() {
        const shuffledAnswerOptions = quizQuestions.map((question) => this.shuffleArray(question.answers));  
        let lives= 3
        let userId= localStorage.getItem('userId')
        let url='https://bloodsite-87a36.firebaseio.com/lives/'+userId+'.json';
        await axios.get(url)
        .then(response=>{
            lives= response.data.lives
            if(lives<=0){
                this.setResults(this.getResults())
            }
            console.log(lives);
        })
        .catch(error=>{
            console.log(error)
        })
        this.setState({
          lives:lives,
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

    deductLives(lives){
        let userId= localStorage.getItem('userId')
        let obj = {lives:lives}
        let url='https://bloodsite-87a36.firebaseio.com/lives/'+userId+'.json';
        axios.put(url,obj)
        .then(response=>{
            console.log(response.data);
        })
        .catch(error=>{
            console.log(error);
        })
    }

    setUserAnswer(answer) {
        var lives=this.state.lives;
        if(answer==="Incorrect"){
            lives=lives<=0?0:lives-1;
            this.deductLives(lives)
        }
        this.props.onUpdateTimer(this.props.timer);
        this.setState((state) => ({
          answersCount: {
            ...state.answersCount,
            [answer]: (state.answersCount[answer] || 0) + 1
          },
          answer: answer,
          lives:lives,
        //   timer:10
        }));
        
        
    }
    async handleAnswerSelected(event) {
        console.log(this.state.lives);
        await this.nextStep(event.currentTarget.value);
    }
    async nextStep(answer) {
        await this.setUserAnswer(answer);
        if (this.state.questionId < quizQuestions.length && this.state.lives > 0) {
            setTimeout(() => this.setNextQuestion(), 300);
        }
        else {
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
          answer: '',
        //   timer:10
        });
        this.props.onUpdateTimer(this.props.timer);
        //()=>this.onUpdateTimer(this.props.timer);
        console.log("New question");
        console.log(this.props.timer);
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

    timerEnds(){
        console.log('here')
        this.nextStep('Incorrect')
        console.log('done')
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
                    onTimerEnds={this.timerEnds}
                />
        );
    }
    renderResult(){
        return (
                <Result
                    quizResult={this.state.result}
                    answerOptions={this.state.answersCount}
                    lives={this.state.lives}
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
        timer:state.timer
    };
}
const mapDispatchToProps=dispatch=>{
    return{
        onUpdateTimer:(time)=>dispatch(actions.update(time)),
        onReduceTimer:(time)=>dispatch(actions.subtractTime(time)),
        
    };
  }

export default connect(mapStateToProps,mapDispatchToProps)(Quiz);