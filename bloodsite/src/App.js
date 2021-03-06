import React, { Component } from 'react';
import './App.css';
import Layout from './components/Layout/Layout';
import Research from './components/Research/Research';
import Home from './components/Home/Home';
import Donate from './components/Donate/Donate';
import Quiz from './components/Quiz/Quiz';
import Statistics from './components/Statistics/Statistics';
import {Route,Switch,Redirect,withRouter} from 'react-router-dom';
import Logout from './components/Logout/Logout';
import Auth from './components/Auth/Auth';
import {connect} from 'react-redux';
import * as actions from './store/actions/index';
import FactsPage from './components/FactsPage/FactsPage';
import ChatBox from './components/ChatBox/ChatBox';
import Profile from './components/Profile/Profile';
import AboutUs from './components/AboutUs/AboutUs';



class App extends Component {
  componentDidMount()
  {
    this.props.onTryAutoSignUp();
  }
  
  render() {
    let routes=(
      <Switch>
      <Route path="/home" exact component={Home} /> 
      <Route path="/donate" exact component={Donate}/>
      <Route path="/facts" exact component={FactsPage}/>
      <Route path="/quiz" exact component={Quiz}/>
      <Route path='/stats' exact component={Statistics}/>
      <Route path="/research" exact component={Research}/>
      <Route path="/logout" exact component={Logout}/>
      <Route path='/help' exact component={ChatBox}/>
      <Route path="/about" exact component={AboutUs}/>
      <Route path="/profile" exact component={Profile} />
      <Route path="/" exact component={Auth}/>
      
      
    </Switch>
    );

    return (
          <div className="App">

            <Layout>
              {routes}
            </Layout>


          </div>
    );
  }
}

const mapStateToProps=state=>{
  return{
    isAuthenticated:state.token!==null
  };
};

const mapDispatchToProps=dispatch=>{
  return{
    onTryAutoSignUp:()=>dispatch(actions.checkAuthState())
  };
};
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(App));
