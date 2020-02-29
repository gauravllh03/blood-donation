import React,{ Component } from "react";
import classes from './Home.css';
import Input from '../UI/Input/Input';
import Button from '../UI/Button/Button';
import {connect} from 'react-redux';
import { Redirect } from "react-router";
import Facts from "../Facts/Facts";
import axios from 'axios';
class Home extends Component
{
    state={
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

    inputChangedHandler=(event,controlName)=>{
        const updatedControls={
            ...this.state.controls,
            [controlName]:{
                ...this.state.controls[controlName],
                value:event.target.value,
                valid:this.checkValidity(event.target.value,this.state.controls[controlName].validation),
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
        const proxyurl = "https://cors-anywhere.herokuapp.com/";
        fetch(proxyurl+'http://127.0.0.1:5000/pred/', 
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
               changed={(event)=>this.inputChangedHandler(event,formElement.id)}
               invalid={!formElement.config.valid} 
               shouldValidate={formElement.config.validation}
               touched={formElement.config.touched} />

        ))




        let redirect=null;
        if(!this.props.isAuthenticated)
        {
            redirect=<Redirect to="/"/>;
        }
        return(
            <React.Fragment>
                {redirect}
                <p className={classes.para}>Please Fill the survey</p>
                <div>
                    <div className={classes.Home}>
                        <form>
                            {form}
                        </form>
                        <Button btnType="Success" clicked={this.onPredict} >Submit</Button>
                    </div>
                    <div className={classes.Facts}>
                        <Facts/>
                    </div>
                </div>
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
