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
            yourblood:
            {
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Enter your bloodgroup'
                },
                value:'',
                validation:{
                    required:true,
                },
                valid:false,
                touched:false
            },
            
        }, 
        curruser:0,
        currusermoney:0,
        net:null,
        moneyneeds:0,
        toggleForm:false
    }


    async componentWillMount()
    {
        await axios.get('https://bloodsite-87a36.firebaseio.com/donated.json')
        .then(resp=>{
            console.log(resp.data);
            let fetchedBlood=[];
            for(let key in resp.data)
            {
                fetchedBlood.push({...resp.data[key],id:key});
            }
            console.log(fetchedBlood);
            let val=0;
            for(let k in fetchedBlood)
            {
                if(fetchedBlood[k].email == localStorage.getItem("email"))
                {
                    val+=parseInt(fetchedBlood[k].volume);
                    console.log('true');
                    console.log(val);
                }
            }
            this.setState({curruser:val});
        })
        .catch(err=>{
            console.log(err);
        })

        let name;
        let bgroup;
        let userId= localStorage.getItem('userId')
        let url='https://bloodsite-87a36.firebaseio.com/users/'+userId+'.json';
        await axios.get(url)
        .then(response=>{
            name=response.data.name;
            bgroup=response.data.bloodgroup;
        })
        .catch(error=>{
            console.log(error)
        })
        this.inputChangedHandler(name,"name");
        this.inputChangedHandler(bgroup,"bloodgroup");
    }

    inputChangedHandler=(event,controlName)=>{
        const updatedControls={
            ...this.state.controls,
            [controlName]:{
                ...this.state.controls[controlName],
                value:event,
                valid:this.checkValidity(event,this.state.controls[controlName].validation),
                touched:true
            }
        };
        this.setState({
            controls:updatedControls
        });

    }
    inputChangedHandlering=(event,controlName)=>{
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
        let userId= localStorage.getItem('userId')
        let obj={
            "name":this.state.controls.name.value,
            "bloodgroup":this.state.controls.bloodgroup.value,
            "volume":this.state.controls.amount.value,
            "token":this.state.controls.token.value,
            "uid":this.props.token,
            "email":localStorage.getItem("email")
        };
        let url='https://bloodsite-87a36.firebaseio.com/donated.json';
        axios.post(url,obj)
        .then(response=>{
            console.log(response.data);
        })
        .catch(error=>{
            console.log(error);
        })
        obj = {lives:3}
        url='https://bloodsite-87a36.firebaseio.com/users/'+userId+'.json';
        axios.patch(url,obj)
        .then(response=>{
            console.log(response.data);
        })
        .catch(error=>{
            console.log(error);
        })
    }

    buyBloodHandler=()=>{
        let bg=this.state.controls1.bloodgroup.value;
        let mybg=this.state.controls1.yourblood.value;
        let amt=this.state.controls1.amount.value;
        console.log(bg);
        console.log(amt);
        console.log(amt*this.props.money[bg]);
        console.log(mybg);
        let moneyhas=this.state.curruser*this.props.money[mybg];
        let moneyneeds=parseInt(amt*this.props.money[bg]);
        this.setState({currusermoney:moneyhas});
        this.setState({moneyneeds:moneyneeds});
        console.log('money:'+moneyhas);
        console.log('money-needed:'+moneyneeds);
        let f=moneyneeds-moneyhas;
        this.setState({net:f});
    }

    toggleFormsBuy=()=>{
        let toggle= this.state.formToggle;
        if(toggle)return;
        else
        this.setState((currentState) => ({
            formToggle: !currentState.formToggle, 
        }));
    }
    toggleFormsDonate=()=>{
        let toggle= this.state.formToggle;
        if(!toggle)return;
        else
        this.setState((currentState) => ({
            formToggle: !currentState.formToggle, 
        }));
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
                id1:key,
                config:this.state.controls1[key]
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

        let form1=formElementsArray1.map(formElement1=>(
            <Input key={formElement1.id1}
               elementType={formElement1.config.elementType} 
               elementConfig={formElement1.config.elementConfig} 
               value={formElement1.config.value}
               changed={(event)=>this.inputChangedHandlering(event.target.value,formElement1.id1)}
               invalid={!formElement1.config.valid} 
               shouldValidate={formElement1.config.validation}
               touched={formElement1.config.touched} />

        ))


        
        let redirect=null;
        if(!this.props.isAuthenticated)
        {
            redirect=<Redirect to="/"/>;
        }

        const donateForm =(
            <div className={classes.Donate}>
                <form style={{margin:"10px"}}>
                    
                    {form}
                    <br/>
                </form>
                <Button btnType="Success" clicked={this.donateBloodHandler}>Submit</Button>
                </div>
        );

        const buyForm=(
            <div className={classes.Donate}>
                <form style={{margin:"10px"}} >
                    {form1}
                    <br/>
                </form>
                <Button btnType="Success" clicked={this.buyBloodHandler}>Submit</Button>
                <br></br>
                <br></br>
                {this.state.net==null?null:
                <div className={classes.Net}>
                    <p>Your total cost is {this.state.moneyneeds} <br></br>{this.state.net<0?"You have adequate currency .Contact us and buy blood":"Your currency is less. Pay money or donate blood to earn enough currency"}</p>
                </div>}
                    <br></br>
            </div>
        );

        let displayForm = !this.state.formToggle?donateForm:buyForm;

        return(
            <React.Fragment>
                {redirect}
                <p className={classes.para}> Donate blood friends</p>
                <br></br>
                <div className={classes.Anchor}><a href="https://testa441.000webhostapp.com/" style={{textDecoration:"none",color:"white"}}>Find Blood Banks</a></div>
                <div className={classes.Button}>
                    <Button btnType="Success" clicked={this.toggleFormsDonate} >DONATED BLOOD?</Button>
                    <Button btnType="Success" clicked={this.toggleFormsBuy}>BUY BLOOD?</Button>
                </div>
                <div className={classes.Button}>
                    <p style={{color:"white"}}>Your total blood donation volume is {this.state.curruser}</p>
                </div>
                {displayForm}
            </React.Fragment>
            
        )
    }
}
const mapStateToProps=state=>{
    return{
        isAuthenticated:state.token!==null,
        token:state.token,
        money:state.money

    };
}
export default connect(mapStateToProps)(Donate);

