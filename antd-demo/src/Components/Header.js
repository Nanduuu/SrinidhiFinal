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
	background: '#4292f4',
	//borderBottom : "5px solid lightblue",
	//boxShadow:"0px 3px 3px lightblue",
	color:"white",
	padding:"10px"
}

const imgBorder ={
	borderRadius: "0px",
	float:"left",
	padding:"5px"
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
					<Col xs={6} sm={6} md={4} lg={4} xl={4} >
						<img src={Logo}  width="40%" style={imgBorder}/>
					</Col>
					<Col xs={12} sm={12} md={16} lg={16} xl={16} >
						<p> <span > Mr </span><b>{this.props.userName}</b></p>
						<span>{this.props.count}</span>
					</Col>
					<Col xs={6} sm={6} md={4} lg={4} xl={4} style={{display:"block-inline"}}>
						  <span style={{display:"display"}}>
     						 <Badge dot><Avatar shape="circle" icon="user" /></Badge>
     									  </span>
							<Button onClick={this.props.logout} >Logout </Button>
						
					</Col>
				</Row>
						
			</div>
			)
	}

}

export default connect(mapStateToProps, mapDispatchToProps)(Header);

