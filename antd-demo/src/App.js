import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './Components/Login';
import Admin from './Components/Admin';
import Schedules from './Components/Schedules';
import WebFont from 'webfontloader';
import Staff from './Components/Staff';
import {Switch, Route,Redirect,Link} from 'react-router-dom';
import Newuser from'./Components/Newuser';
import PageNotFound from './Components/PageNotFound';


const fontStyle = {

  fontFamily : " 'Titillium Web','Chinese Quote','sans-serif'",
  
  height:"100%"
}

WebFont.load({
  google: {
    families: ['Titillium Web:300,400,700', 'sans-serif']
  }
});

const mapStateToProps = (state) => {
	
    return {
    	
    	isauthenticated:state.red.isauthenticated,
    	user:state.red.user
        
    }
}

class App extends Component {
   render() {
    return (
      <div className="App" style={fontStyle}>
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
