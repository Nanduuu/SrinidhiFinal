import React from 'react';
import Logo from './../Images/logo.png';
import {Row, Col,Button} from 'antd';
import { LogOutButton } from './Elements/Ccbutton';
import { Avatar, Badge } from 'antd';
import { connect } from 'react-redux';
import {logout} from '../Redux/Actions';
import {Redirect} from 'react-router-dom'

const baseStyle = {
	width:'100%',
	background: '#4479a1',
	color:"white",
	padding:"5px"
}

const imgBorder ={
	width:"100px",
	borderRadius: "0px",
	float:"left",
	padding:"1px",
	borderRadius:"50px 50px"
}

const mapStateToProps = (state) => {
	
    return {
        userName: state.user.Fname,
        authenticated:state.isauthenticated
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
					<Col xs={12} sm={16} md={18} lg={20} xl={20} >
					</Col>
					<Col xs={6} sm={5} md={3} lg={2} xl={2} style={{display:"block-inline"}}>
							
						  <span style={{aligh:"right"}}>
     						 <Badge status="success" dot ><Avatar shape="circle" icon="user" /></Badge>
     						 <p> <span > Mr </span><b>{this.props.userName}</b></p>
     					 </span>
     					
							<Button style={{ margin:"auto",position:"relative"}} onClick={this.props.logout} >Logout </Button>
						
					</Col>
				</Row>
			</div>
			)
	}

}

export default connect(mapStateToProps, mapDispatchToProps)(Header);

