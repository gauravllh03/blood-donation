import React,{ Component } from "react";
import classes from './Donate.css';
import {connect} from 'react-redux';
import { Redirect } from "react-router";
class Donate extends Component
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
                <p className={classes.para}> Donate blood friends</p>
            </React.Fragment>
            
        )
    }
}
const mapStateToProps=state=>{
    return{
        isAuthenticated:state.token!==null
    };
}
export default connect(mapStateToProps)(Donate);

