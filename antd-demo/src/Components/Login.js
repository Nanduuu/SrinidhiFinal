import React,{Component} from 'react';
import {Row, Col} from 'antd';
import {Button} from 'antd';
import Logo from './../Images/logo.png';
import { Input  } from 'antd';
import {connect} from 'react-redux';
import Forgotpword from './Forgotpword';
import Newuser from './Newuser';
import {login} from '../Redux/Actions';
import {Redirect,Link } from 'react-router-dom';

const header = {
	position:'fixed',
	height:'50%',
	width:"100%",
	background: '#4292f4'
}

const center = {
	position:'fixed',
	top:'50%',
	height:'40%',
	width:"100%",
	
}

const footer = {
	position:'fixed',
	top:"90%",
	height:'40%',
	width:"100%",
	background: '#4292f4'
}

var border={

	borderRadius: "25px",
	border: "2px solid #4292f4",
	backgroundColor : "white"
}

const mapStateToProps = (state)=>{
	return {
		authFailed : state.authFailed,
		isauthenticated : state.isauthenticated,
		Role : state.user.Role
	}
}

const mapDispatchToProps = (dispatch) =>{
	return{
		login : (state)=>{
			dispatch(login(state));
			}
		}

	}


class Login extends Component{
	constructor (props){
		super(props);
		this.state = {
			email:"",
			pword:""
		}
		this.Onchange = this.Onchange.bind(this);
		this.isredirect = this.isredirect.bind(this);

	}

	Onchange = ( e)=>{
		this.setState(
			{[e.target.name] : e.target.value}
			)
		//console.log(this.state);
	}

  handleSubmit = (event)=> {
    event.preventDefault();
    this.props.login(this.state);
  }

  isredirect = (Role)=>{
  	if (Role == "staff"){
  		return <Redirect to='/staff' />
  	}
  	if (Role == "admin" ){
  		return <Redirect to = '/admin' />
  	}
  	return null;

  }

  componentDidMount(){
  		console.log(this.props);
  }
  componentWillMount(){
  	 
  }

	render(){

		this.isredirect(this.props.Role);
		
		return(	
					
				<div>

						 {this.isredirect(this.props.Role)}
						<div style={header}>
						</div>
						<div style={center}>
						</div>
						<div style={footer}>
						</div>

						
						<div style = {{position:"absolute",top:"25%",width:"100%",height:"50%"}}>
									<Row>
											<Col xs={2} sm={1} md={4} lg={6} xl={6}>
											</Col>
											<Col   xs={20} sm={22} md={16} lg={12} xl={12} style={ border}>
												<div style	={{padding:"10px"}}>
													<img src={Logo} width="15%" />
												</div>
												<div>
												<form onSubmit = {this.handleSubmit}>
													<Row style	={{padding:"10px"}}>
													<Col xs={2} sm={1} md={4} lg={6} xl={6}>
													</Col>
													<Col xs={20} sm={22} md={16} lg={12} xl={12}>
															<p style={{color:"red"}}>{this.props.authFailed ? "Authentication failed" :" "}</p>
															<Input name="email" type="email" onChange={this.Onchange} placeholder="Please enter emial Id" required / >
															<Input name="pword" type="password" onChange={this.Onchange} placeholder="Enter password" required />
															
													</Col>
													<Col xs={2} sm={1} md={4} lg={6} xl={6}>
													</Col>
													</Row>
													<Row style	={{padding:"10px"}}>
													<Col xs={2} sm={1} md={4} lg={6} xl={6}>
													</Col>
													<Col xs={20} sm={22} md={16} lg={12} xl={12}>
															<Row>
																<Col xs={12} sm={12} md={12} lg={12} xl={12} >
																	<Input type="submit" style={{width:"100%"}} value="Submit"/> 
																</Col>
																<Col xs={12} sm={12} md={12} lg={12} xl={12}>
																	<Button style={{width:"100%"}} ><Link to={'/newuser/'} >New user ? </Link></Button>
																</Col>
															</Row>									

													</Col>
													<Col xs={2} sm={1} md={4} lg={6} xl={6}>
													</Col>
													</Row>
												</form>	
												</div>
												
												
											</Col>
											<Col  xs={2} sm={1}md={4} lg={6} xl={6} >
											</Col>

									</Row>
						</div>
						
					

				</div>

			);
	}



}

export default connect(mapStateToProps,mapDispatchToProps) (Login);