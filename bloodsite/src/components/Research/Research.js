import React,{ Component } from "react";
import classes from './Research.css';
import {connect} from 'react-redux';
import { Redirect } from "react-router";
import Facts from '../Facts/Facts';
class Research extends Component
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
                <p className={classes.para}>Research work friends</p>
                <Facts/>
                <button><a target="_blank" href="https://testa441.000webhostapp.com/">Stackoverflow</a></button>
            </React.Fragment>
        )
    }
}

const mapStateToProps=state=>{
    return{
        isAuthenticated:state.token!==null
    };
}
export default connect(mapStateToProps)(Research);
