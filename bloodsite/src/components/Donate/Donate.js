import React,{ Component } from "react";
import classes from './Donate.css';
import {connect} from 'react-redux';
import { Redirect } from "react-router";
import Input from '../UI/Input/Input';
import Button from '../UI/Button/Button';
import axios from 'axios';

class Donate extends Component
{
    state={
        controls:{
            name:
            {
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Your Full name'
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
                    placeholder:'Your Blood Group'
                },
                value:'',
                validation:{
                    required:true,
                },
                valid:false,
                touched:false
            },
            amount:
            {
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Volume of blood in cc'
                },
                value:'',
                validation:{
                    required:true,
                
                },
                valid:false,
                touched:false
            },
            
            token:
            {
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Token you received'
                },
                value:'',
                validation:{
                    required:true,
                },
                valid:false,
                touched:false
            },
        }, 
        controls1:{
            bloodgroup:
            {
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Blood Group Required'
                },
                value:'',
                validation:{
                    required:true,
                },
                valid:false,
                touched:false
            },
            amount:
            {
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Volume of blood you want cc'
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
        if(rules.minLength)
        {
            isValid=value.length>=rules.minLength && isValid;
        }
        return isValid;
    }
    donateBloodHandler=()=>{
        let obj={
            "name":this.state.controls.name.value,
            "bloodgroup":this.state.controls.bloodgroup.value,
            "volume":this.state.controls.amount.value,
            "token":this.state.controls.token.value,
            "uid":this.props.token
        };
        let url='https://bloodsite-87a36.firebaseio.com/donated.json';
        axios.post(url,obj)
        .then(response=>{
            console.log(response.data);
        })
        .catch(error=>{
            console.log(error);
        })
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

        const formElementsArray1=[];
        for(let key in this.state.controls1)
        {
            formElementsArray1.push({
                id:key,
                config:this.state.controls1[key]
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

        let form1=formElementsArray1.map(formElement=>(
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
                <p className={classes.para}> Donate blood friends</p>
                <div className={classes.Donate}>
                <p className={classes.pa}>DONATED BLOOD?</p>
                <form style={{margin:"10px"}}>
                    
                    {form}
                    <br/>
                </form>
                <Button btnType="Success" clicked={this.donateBloodHandler}>Submit</Button>
                </div>
                <br></br>
                <br></br>
                <div className={classes.Donate}>
                <p className={classes.pa}>BUY BLOOD?</p>
                <form style={{margin:"10px"}} >
                    
                    {form1}
                    <br/>
                </form>
                <Button btnType="Success" clicked={this.buyBloodHandler}>Submit</Button>
                
                </div>
                <br></br>
                <br></br>
            </React.Fragment>
            
        )
    }
}
const mapStateToProps=state=>{
    return{
        isAuthenticated:state.token!==null,
        token:state.token
    };
}
export default connect(mapStateToProps)(Donate);

