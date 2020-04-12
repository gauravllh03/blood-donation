import React,{Component} from 'react';
import Snowfall from 'react-snowfall';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';
import {connect} from 'react-redux';
import SnowStorm from 'react-snowstorm';
import Particles from 'react-particles-js';
import classes from './Layout.css';
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
                 <Snowfall className={classes.particles}
                        color="red"
                        snowflakeCount={150}
                        style={{ height: '150vh', width: '100%',zIndex:"-100"}} 
                />  

            {/* <div>
                <SnowStorm excludeMobile="false" flakesMaxActive="150" snowColor="red" followMouse="false" vMaxY="5" snowSize="20"/>
            </div> */}
            {/* <Particles className={classes.particles}
        params={{
          "particles": {
            "number": {
              "value": 300,
              "density": {
                  "enable": false
              }
            },
            "size": {
              "value": 3,
              "random": true
            },
            "move": {
              "direction": "bottom",
              "out_mode": "out"
            },
            "line_linked": {
              "enable": false
            }
          },
          "interactivity": {
            "events": {
              "onhover": {
                "enable": true,
                "mode": "repulse"
              }
            },
            "modes": {
              "repulse": {
                  "particles_nb": 10
              }
            }
          }
        }}
        /> */}
            <Toolbar isAuth={this.props.isAuthenticated} drawerToggleClicked={this.sideDrawerToggleHandler}/>
            <SideDrawer isAuth={this.props.isAuthenticated} open={this.state.showSideDrawer} closed={this.sideDrawerClosedHandler}/>
            <main style={{marginTop:"55px"}}>
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
 




