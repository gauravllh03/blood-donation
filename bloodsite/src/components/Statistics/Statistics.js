import React,{ Component } from "react";
import classes from './Statistics.css';
import {connect} from 'react-redux';
import { Redirect } from "react-router";
import PieChart from 'react-simple-pie-chart';
import axios from 'axios';
import Spinner from '../UI/Spinner/Spinner'
import Gridview from './Gridview/Gridview'
import Modal from '../UI/Modal/Modal'

class Statistics extends Component
{
    state={
        data:null,
        currCurrency:0,
        currVol:0,
        currBlood:0,
        stat:{
            "O+":0,
            "O-":0,
            "AB+":0,
            "AB-":0,
            "A":0,
            "B":0
        },
        loading: true,
        totalBlood:0
    }
    componentWillMount()
    {
        let totalBlood=0;
        axios.get('https://bloodsite-87a36.firebaseio.com/donated.json')
        .then(resp=>{
            console.log(resp.data);
            let fetchedBlood=[];
            for(let key in resp.data)
            {
                fetchedBlood.push({...resp.data[key],id:key});
                totalBlood= totalBlood + +resp.data[key].volume;
            }
            console.log(fetchedBlood);
            console.log("total blood= ",totalBlood)
            let val=0;
            let bg=null;
            for(let k in fetchedBlood)
            {
                if(fetchedBlood[k].uid == this.props.token)
                {
                    val+=parseInt(fetchedBlood[k].volume);
                    bg=fetchedBlood[k].bloodgroup;
                    console.log('true');
                }
            }
            let currency=0;
            currency=val*this.props.money[bg];
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
            this.setState({currCurrency:currency});
            this.setState({currVol:val});
            this.setState({currBlood:bg});
            //console.log((fetchedBlood[0].uid));
            this.setState({data:fetchedBlood});
            this.setState({loading: false})
            this.setState({totalBlood: totalBlood})
            console.log("state blood", this.state.totalBlood)
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

        let chart= <Spinner />;
        if(!this.state.loading) {
            chart = (
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
            );

            
        }

        return(
            <React.Fragment>
                {redirect}
                <div className={classes.chartbox} style={{width:"200px",height:"200px",margin:"auto",marginTop:"100px",opacity:"0.7"}}>
                    {chart}
                </div>
                <div className={classes.foom}>
                    <div className={classes.sep}>
                        <div className={classes.foo} style={{background:"#f00"}}></div>
                        <div className={classes.text}>O- {this.state.stat["O-"]}</div>
                    </div>
                    <div className={classes.sep}>
                        <div className={classes.foo} style={{background:"#0B6623"}}></div>
                        <div className={classes.text}>O+ {this.state.stat["O+"]}</div>
                    </div>

                    <div className={classes.sep}>
                        <div className={classes.foo} style={{background:"#ffd500"}}></div>
                        <div className={classes.text} >AB+ {this.state.stat["AB+"]}</div>
                    </div>
                    <div className={classes.sep}>
                        <div className={classes.foo} style={{background:"#3c00ff"}}></div>
                        <div className={classes.text}>AB- {this.state.stat["AB-"]}</div>
                    </div>
                    <div className={classes.sep}>
                        <div className={classes.foo} style={{background:"#cc00ff"}}></div>
                        <div className={classes.text}>A {this.state.stat["A"]}</div>
                    </div>
                    <div className={classes.sep}>
                        <div className={classes.foo} style={{background:"#50C878"}}></div>
                        <div className={classes.text}>B {this.state.stat["B"]}</div>
                    </div>
                </div>
                <div className={classes.Data}>
                    <p className={classes.curr}>Your Blood Group : {this.state.currBlood}</p>
                    <p className={classes.curr}>Your Donated Volume : {this.state.currVol}</p>
                    <p className={classes.curr}>Your Available currency : {this.state.currCurrency}</p>
                </div>
                {this.state.loading ? null : <Gridview totalBlood={this.state.totalBlood}/>}
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
export default connect(mapStateToProps)(Statistics);
