import React, {Component} from 'react';
import Input from '../UI/Input/Input';
import Button from '../UI/Button/Button';
import classes from './Auth.css';
import * as actions from '../../store/actions/index';
import {connect} from 'react-redux';
import Spinner from '../UI/Spinner/Spinner';
import { Redirect } from 'react-router';


class Auth extends Component
{

    state={
        controls:{
            email:
            {
                elementType:'input',
                elementConfig:{
                    type:'email',
                    placeholder:'Your Mail'
                },
                value:'',
                validation:{
                    required:true,
                    isEmail:true
                },
                valid:false,
                touched:false
            },
            password:
            {
                elementType:'input',
                elementConfig:{
                    type:'password',
                    placeholder:'Your Password'
                },
                value:'',
                validation:{
                    required:true,
                    minLength:7
                },
                valid:false,
                touched:false
            },
            
           
        },
        controls1:{
            email:
            {
                elementType:'input',
                elementConfig:{
                    type:'email',
                    placeholder:'Your Mail'
                },
                value:'',
                validation:{
                    required:true,
                    isEmail:true
                },
                valid:false,
                touched:false
            },
            password:
            {
                elementType:'input',
                elementConfig:{
                    type:'password',
                    placeholder:'Your Password'
                },
                value:'',
                validation:{
                    required:true,
                    minLength:7
                },
                valid:false,
                touched:false
            },
            name:
            {
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Your Name'
                },
                value:'',
                validation:{
                    required:true
                },
                valid:false,
                touched:false
            },
            blood:
            {
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Your Bloodgroup'
                },
                value:'',
                validation:{
                    required:true,
                },
                valid:false,
                touched:false
            },
            gender:
            {
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Your gender M/F'
                },
                value:'',
                validation:{
                    required:true,
                    maxLength:1
                },
                valid:false,
                touched:false
            },
            age:
            {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Age'
                },
                value: '',
                validation: {
                    required: true,
                    maxLength:2
                },
                valid:false,
                touched:false
            }
           
        },
        isSignUp:true
        
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
        if(rules.maxLength)
        {
            isValid=value.length<=rules.maxLength && isValid;
        }
        if ( rules.isEmail ) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test( value ) && isValid
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

    inputChangedHandlerNow=(event,controlName)=>{
        const updatedControls={
            ...this.state.controls1,
            [controlName]:{
                ...this.state.controls1[controlName],
                value:event.target.value,
                valid:this.checkValidity(event.target.value,this.state.controls1[controlName].validation),
                touched:true
            }
        };
        this.setState({
            controls1:updatedControls
        });

    }


    submitHandler=(event)=>{
        event.preventDefault();
        if(this.state.isSignUp==false)
            this.props.onAuth(this.state.controls.email.value,this.state.controls.password.value,"signin","signin","M",this.state.isSignUp);
        else
            this.props.onAuth(this.state.controls1.email.value,this.state.controls1.password.value,this.state.controls1.name.value,this.state.controls1.blood.value,this.state.controls1.gender.value,this.state.isSignUp);
    }

    switchAuthModeHandler=()=>{
        this.setState(prevState=>{
            return{
                isSignUp:!prevState.isSignUp
            }
        })
    }

    SwitchSignIn=()=>{
        this.setState({isSignUp:false});
    }

    SwitchSignUp=()=>{
        this.setState({isSignUp:true});
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
               changed={(event)=>this.inputChangedHandlerNow(event,formElement.id)}
               invalid={!formElement.config.valid} 
               shouldValidate={formElement.config.validation}
               touched={formElement.config.touched} />

    ))
        if(this.props.loading)
        {
            form=<Spinner></Spinner>
        }

        let errorMessage=null;
        if(this.props.error)
        {

            let x='';
            let y=this.props.error.message;
           for(var i=0;i<y.length;i++)
           {
               if(y.charAt(i)==='_')
               {
                   x+=' ';
                  
               }
               else
               {
                   x+=y.charAt(i);
               }
           }
            errorMessage=(<p style={{color:'red',fontWeight:'bold',textShadow:'0px 0.5px white'}}>{x}</p>)
            
        }

        let redirect=null;
        if(this.props.isAuthenticated)
        {
            redirect=<Redirect to="/home"/>;
        }
        let authform=null;
        if(this.state.isSignUp==true)
        {
            authform=form1;
        }
        else
        {
            authform=form;
        }
        return(
           
            <div className={classes.Auth}>
                {redirect}
                {/* <i className="fa fa-user-plus" style={{fontSize:"50px",color:"red"}}/> */}
                {/* <p className={classes.pa}>SIGNIN TO CONTINUE</p> */}
                <div style={{width:"100%"}}>
                    <button className={classes.But} onClick={this.SwitchSignUp}>SignUp</button>
                    <button className={classes.But} onClick={this.SwitchSignIn}>SignIn</button>
                </div>
                <span className="fa-stack fa-5x">
                    <i className="fa fa-circle fa-stack-2x icon-background4" style={{color:"white"}}></i>
                    <i className="fa fa-user-plus fa-stack-1x" style={{color:"red"}}></i>
                </span>
                {errorMessage}
                <form style={{margin:"10px"}} onSubmit={this.submitHandler}>
                    
                    {authform}
                    <br></br>
                    <Button btnType="Success" >SUBMIT</Button>
                </form>
                

                
            </div>
            
            
        );
    }
}


const mapStateToProps=state=>{
    return{
        loading:state.loading,
        error:state.error,
        isAuthenticated:state.token!==null
    };
};
const mapDispatchToProps=dispatch=>{
    return{
        onAuth:(email,password,name,blood,gender,isSignUp)=>dispatch(actions.auth(email,password,name,blood,gender,isSignUp)),
    }
};
export default connect(mapStateToProps,mapDispatchToProps)(Auth);