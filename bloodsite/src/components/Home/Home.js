import React,{ Component } from "react";
import classes from './Home.css';
import Input from '../UI/Input/Input';
import Button from '../UI/Button/Button';
import {connect} from 'react-redux';
import { Redirect } from "react-router";
import Facts from "../Facts/Facts";
import axios from 'axios';
import FactsList from '../../assets/api/FactsList'
import Slider from './Slider/Slider';


class Home extends Component
{
    state={
        donor:null,
        nonDonor:null,
        controls:{
            name:
            {
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Your full name'
                },
                value:'',
                validation:{
                    required:true,
                },
                valid:false,
                touched:false
            },

            bloodgroup:
            {
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Your blood group'
                },
                value:'',
                validation:{
                    required:true,
                },
                valid:false,
                touched:false
            },
            age:
            {
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Your Age'
                },
                value:'',
                validation:{
                    required:true,
                },
                valid:false,
                touched:false
            },
            monthlast:
            {
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Number of months since you donated'
                },
                value:'',
                validation:{
                    required:true,
                },
                valid:false,
                touched:false
            },
            noOfDon:
            {
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Number of donations till date'
                },
                value:'',
                validation:{
                    required:true,
                },
                valid:false,
                touched:false
            },
            totalVol:
            {
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Total volume you donated'
                },
                value:'',
                validation:{
                    required:true,
                },
                valid:false,
                touched:false
            },

            monthFirst:
            {
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Number of months since first donation'
                },
                value:'',
                validation:{
                    required:true,
                },
                valid:false,
                touched:false
            },
            
           
        },
    }

    async componentDidMount(){
        let name;
        let bgroup;
        let gender;
        let userId= localStorage.getItem('userId')
        let url='https://bloodsite-87a36.firebaseio.com/users/'+userId+'.json';
        await axios.get(url)
        .then(response=>{
            name=response.data.name;
            bgroup=response.data.bloodgroup;
            gender=response.data.gender;
        })
        .catch(error=>{
            console.log(error)
        })
        this.inputChangedHandler(name,"name");
        this.inputChangedHandler(bgroup,"bloodgroup");
    }
    
    checkValidity(value,rules)
    {
        if(!rules)
        {
            return true;
        }
        let isValid=true;
        if(rules.required)
        {
            isValid=value.trim()!=='' && isValid;
        }
        return isValid;
    }



    inputChangedHandler=(value,controlName)=>{
        console.log(typeof(controlName));
        const updatedControls={
            ...this.state.controls,
            [controlName]:{
                ...this.state.controls[controlName],
                value:value,
                valid:this.checkValidity(value,this.state.controls[controlName].validation),
                touched:true
            }
        };
        this.setState({
            controls:updatedControls
        });
    }

    onPredict=()=>{
        let obj={
            "Months since Last Donation":this.state.controls.monthlast.value,
            "Number of Donations":this.state.controls.noOfDon.value,
            "Total Volume Donated (c.c.)":this.state.controls.totalVol.value,
            "Months since First Donation":this.state.controls.monthFirst.value,
        };
        fetch('http://127.0.0.1:5000/pred/', 
        {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(obj)
        })
        .then(response => response.json())
        .then(response => {
            console.log(response.data);
      });
      let x=parseInt(Math.round(Math.random()));
      if(x==0)
        this.setState({nonDonor:1});
      else
        this.setState({donor:1});

    }

    render()
    {

        const formElementsArray=[];
        for(let key in this.state.controls)
        {
            formElementsArray.push({
                id:key,
                config:this.state.controls[key]
            });
        }
        let form=formElementsArray.map(formElement=>(
            <Input key={formElement.id}
               elementType={formElement.config.elementType} 
               elementConfig={formElement.config.elementConfig} 
               value={formElement.config.value}
               changed={(event)=>this.inputChangedHandler(event.target.value,formElement.id)}
               invalid={!formElement.config.valid} 
               shouldValidate={formElement.config.validation}
               touched={formElement.config.touched} />

        ))
        let red=null;
        if(this.state.nonDonor)
        {
            red=<Redirect to="/facts"/>;
        }

        if(this.state.donor)
        {
            red=<Redirect to="/donate"/>;
        }

        let redirect=null;
        if(!this.props.isAuthenticated)
        {
            redirect=<Redirect to="/"/>;
        }
        console.log(FactsList);
        return(
            <React.Fragment>
                {redirect}
		        <Slider />
                {red}

                <div className="container" style={{marginTop:"20px"}}>
                    <div className="row">
                        <div className="col-lg-6 col-md-12 col-sm-12">
                            <div className={classes.Home}>
                                <p style={{fontSize:"20px"}}> Please fill the survey</p>
                                <form>
                                    {form}
                                </form>
                                <Button btnType="Success" clicked={this.onPredict} >Submit</Button>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-12 col-sm-12">

                            <div className={classes.Map}>
                                <div className={classes.Text} style={{textAlign:"center",backgroundColor:"black",fontSize:"18px",marginTop:"10px"}}>Blood banks near me &#129488;</div>
                                <iframe src="https://testa441.000webhostapp.com/" className={classes.Maps} ></iframe>
                                <div className={classes.Text} style={{textAlign:"center",backgroundColor:"black",fontSize:"18px",marginTop:"5px"}}>Did you know?</div>
                                <div><Facts  myth= {FactsList[0].Myth} fact={FactsList[0].Fact}/></div>
                            </div>
                        </div>

                    </div>
                </div>
                <div className={classes.FooterFix}></div>      
            </React.Fragment>
        )
    }
}

const mapStateToProps=state=>{
    return{
        isAuthenticated:state.token!==null
    };
}
export default connect(mapStateToProps)(Home);
