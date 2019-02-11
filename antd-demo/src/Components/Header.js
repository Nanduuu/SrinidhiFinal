import React from 'react';
import Logo from './../Images/logo.png';
import {Row, Col,Button,Icon} from 'antd';
import { LogOutButton } from './Elements/Ccbutton';
import { Avatar, Badge } from 'antd';
import { connect } from 'react-redux';
import {logout} from '../Redux/Actions';
import {Redirect} from 'react-router-dom'

const baseStyle = {
	width:'100%',
	background: '#4479a1',
	color:"white",
	padding:"3px"
}

const imgBorder ={
	width:"60px",
	borderRadius: "0px",
	float:"left",
	padding:"1px",
	borderRadius:"50px 50px"
}

const divStyle = {

  textOverflow : "hidden",
  overflow : "hidden"

}

const mapStateToProps = (state) => {
		debugger;
    return {
        userName: state.Reducer.user.Fname,
        authenticated:state.Reducer.isauthenticated
   }
}

const mapDispatchToProps = (dispatch)=>{
	return{
		logout : ()=>{
			dispatch(logout());
		}
	}

}

class Header extends React.Component{
	constructor(props){
		super(props);
	}
	render(){
		return(
			<div>
				{this.props.authenticated ? null : <Redirect to='/'/>}
				<Row style={baseStyle}>	
					<Col xs={6} sm={3} md={3} lg={2} xl={2} >
						<img src={Logo}  width="75%" style={imgBorder}/>
						
					</Col>
					<Col xs={12} sm={16} md={17} lg={18} xl={18} >
					</Col>
					<Col xs={0} sm={2} md={1} lg={2} xl={2}>
							
					</Col>
					<Col xs={5} sm={3} md={3} lg={2} xl={2}>
							
							 <Badge status="success" dot ><Avatar shape="circle" icon="user" /></Badge>
							 <div>
     							 <a style={{ margin:"auto",position:"relative",color:"white"}} onClick={this.props.logout} > <Icon type="logout" style={{color:"white"}}/> Logout</a>
     						 </div>
     						 
     				</Col>
     				
				</Row>
			</div>
			)
	}

}

export default connect(mapStateToProps, mapDispatchToProps)(Header);

