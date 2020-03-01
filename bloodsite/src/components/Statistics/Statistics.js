import React,{ Component } from "react";
import classes from './Statistics.css';
import {connect} from 'react-redux';
import { Redirect } from "react-router";
import PieChart from 'react-simple-pie-chart';
import axios from 'axios';
class Statistics extends Component
{
    state={
        data:null,
        currCurrency:0,
        stat:{
            "O+":0,
            "O-":0,
            "AB+":0,
            "AB-":0,
            "A":0,
            "B":0
        }
    }
    componentWillMount()
    {
        axios.get('https://bloodsite-87a36.firebaseio.com/donated.json')
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
                if(fetchedBlood[k].uid == this.props.token)
                {
                    val+=parseInt(fetchedBlood[k].volume);
                    console.log('true');
                }
            }

            let blood={
                "O+":0,
                "O-":0,
                "AB+":0,
                "AB-":0,
                "A":0,
                "B":0
            };

            for(let x in fetchedBlood)
            {
                console.log(fetchedBlood[x].bloodgroup);
                if(fetchedBlood[x].bloodgroup=="O+")
                {
                    blood['O+']+=parseInt(fetchedBlood[x].volume);
                }
                if(fetchedBlood[x].bloodgroup=="O-")
                {
                    console.log('True');
                    blood['O-']+=parseInt(fetchedBlood[x].volume);
                }
                if(fetchedBlood[x].bloodgroup=="AB+")
                {
                    console.log('True');
                    blood['AB+']+=parseInt(fetchedBlood[x].volume);
                }
                if(fetchedBlood[x].bloodgroup=="AB-")
                {
                    console.log('True');
                    blood['AB-']+=parseInt(fetchedBlood[x].volume);
                }
                if(fetchedBlood[x].bloodgroup=="A")
                {
                    console.log('True');
                    blood['A']+=parseInt(fetchedBlood[x].volume);
                }
                if(fetchedBlood[x].bloodgroup=="B")
                {
                    console.log('True');
                    blood['B']+=parseInt(fetchedBlood[x].volume);
                }
            }
            this.setState({stat:blood});
            console.log(blood);
            //console.log((this.props.token));
            console.log(val);
            this.setState({currCurrency:val})
            //console.log((fetchedBlood[0].uid));
            this.setState({data:fetchedBlood});
            
        })
        .catch(error=>{
            console.log(error);
        })
    }
    render()
    {
        let redirect=null;
        if(!this.props.isAuthenticated)
        {
            redirect=<Redirect to="/"/>;
        }
        return(
            <React.Fragment>
                {redirect}
                <p className={classes.para}>Statistics work friends</p>
                <div style={{width:"200px",height:"200px",margin:"auto",opacity:"0.7"}}>
                    <PieChart
                        slices={[
                            {
                            color: '#f00',
                            value: this.state.stat['O-'],
                            },
                            {
                            color: '#0B6623',
                            value: this.state.stat["O+"]
                            },
                            {
                                color: '#ffd500',
                                value: this.state.stat["AB+"],
                            },
                            {
                                color: '#3c00ff',
                                value: this.state.stat["AB-"],
                            },
                            {
                                color: '#cc00ff',
                                value: this.state.stat["A"],
                            },
                            {
                                color: '#50C878',
                                value: this.state.stat["B"],
                            },

                        ]}
                    />
                </div>
                <div className={classes.foom}>
                    <div className={classes.foo} style={{background:"#f00"}}></div>
                    <div className={classes.text}>O- {this.state.stat["O-"]}</div>
                    <div className={classes.foo} style={{background:"#0B6623"}}></div>
                    <div className={classes.text}>O+ {this.state.stat["O+"]}</div>
                    <div className={classes.foo} style={{background:"#ffd500"}}></div>
                    <div className={classes.text} >AB+ {this.state.stat["AB+"]}</div>
                    <div className={classes.foo} style={{background:"#3c00ff"}}></div>
                    <div className={classes.text}>AB- {this.state.stat["AB-"]}</div>
                    <div className={classes.foo} style={{background:"#cc00ff"}}></div>
                    <div className={classes.text}>A {this.state.stat["A"]}</div>
                    <div className={classes.foo} style={{background:"#50C878"}}></div>
                    <div className={classes.text}>B {this.state.stat["B"]}</div>
                </div>
                <p className={classes.curr}>Your Available currency : {this.state.currCurrency}</p>
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
export default connect(mapStateToProps)(Statistics);
