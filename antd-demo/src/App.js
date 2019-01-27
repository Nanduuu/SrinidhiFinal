import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './Components/Login';
import Admin from './Components/Admin';
import Schedules from './Components/Schedules';
import Staff from './Components/Staff';
import Addclient from './Components/Addclient';
import Media from "react-media";
import {Jobdesc} from './Components/Jobdesc';
import Userdashboard from './Components/Userdashboard';
import {Switch, Route,Redirect,Link} from 'react-router-dom';
import Newuser from'./Components/Newuser';
import PageNotFound from './Components/PageNotFound';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
	
    return {
    	
    	isauthenticated:state.isauthenticated,
    	user:state.user
        
    }
}

class App extends Component {
   render() {
    return (
      <div className="App">
      	 <Switch>
          <Route exact path = '/' component={Login} />
          <Route path ='/newuser' component={Newuser} />
      		<Route path ='/staff' component={Staff} />
      		<Route path ='/admin' component={Admin}  />
          <Route path = '/PageNotFound' component={PageNotFound}/>
          
      	</Switch>
  
     </div>
    );
  }  
}

export default App;
