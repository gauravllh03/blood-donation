import React,{Component} from 'react';
import Snowfall from 'react-snowfall'
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';
import {connect} from 'react-redux';

class Layout extends Component
{
    state={
        showSideDrawer:false
    }

    sideDrawerClosedHandler=()=>{
        this.setState({
            showSideDrawer:false
        });
    }

    sideDrawerToggleHandler=()=>{
        this.setState((prevState)=>{
            return {
                showSideDrawer:!prevState.showSideDrawer
            };
        });
    }
    render()
    {
        return (
        <React.Fragment>
            <Snowfall
                    color="red"
                    snowflakeCount={200}
            />
            <Toolbar isAuth={this.props.isAuthenticated} drawerToggleClicked={this.sideDrawerToggleHandler}/>
            <SideDrawer isAuth={this.props.isAuthenticated} open={this.state.showSideDrawer} closed={this.sideDrawerClosedHandler}/>
            <main style={{marginTop:"70px"}}>
                {this.props.children}
            </main>
        </React.Fragment>
        );
    }
}
const mapStateToProps=state=>{
    return{
        isAuthenticated:state.token!==null
    };
}

export default connect(mapStateToProps)(Layout); 
 




