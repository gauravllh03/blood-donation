import React,{ Component } from "react";
import classes from './Statistics.css';
import {connect} from 'react-redux';
import { Redirect } from "react-router";
import PieChart from 'react-simple-pie-chart';
class Statistics extends Component
{
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
                <div style={{width:"200px",height:"200px",margin:"auto",opacity:"0.5"}}>
                    <PieChart
                        slices={[
                            {
                            color: '#f00',
                            value: 10,
                            },
                            {
                            color: '#0f0',
                            value: 20,
                            },
                            {
                                color: '#0ff',
                                value: 20,
                            },
                            {
                                color: '#fff',
                                value: 20,
                                },
                        ]}
                    />
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
export default connect(mapStateToProps)(Statistics);
