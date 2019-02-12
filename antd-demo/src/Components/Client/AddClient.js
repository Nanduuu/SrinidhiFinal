import React from 'react';
import {Row,Col} from 'antd';
import {Button, Dropdown,Input}  from 'antd';
import {Menu, Icon,TimePicker} from 'antd';
import {Select,message,DatePicker ,InputNumber} from 'antd';
import moment from 'moment';
import {Redirect} from 'react-router-dom';
import { connect } from 'react-redux';
import {addClient,beginAddCleint,setaddclient} from './Actions';
import { Divider } from 'antd';


const format = 'HH:mm';
const { TextArea } = Input;

const Option = Select.Option;

const InputStyle={
	width:"100%",
	padding:"5px"
}
const LabelStyle = {
	textAlign:"center",
	paddingTop:"10px"
}
const submitStyle = {
	width:"90%"
}

const success = (text) => {
  message.success(text);
};
const error = (text)=>{
	message.error(text)
}

const mapStateToProps = (state) => {
    return {
        userName: state.Reducer.user.Fname,
        authenticated:state.Reducer.isauthenticated,
        statusInd : state.Reducer.actions.addclient,
        role : state.Reducer.user.Role,

        msg:state.ClientDetails.addClientMsg,
        addClientSuccess: state.ClientDetails.addClientSuccess,
       
    }
}
const mapDispatchToProps = (dispatch)=>{
	return{
		addClient : (data)=>{
			dispatch(addClient(data));
		},
		beginAddCleint : ()=>{
			dispatch(beginAddCleint());
		},
		setaddclient : ()=>{
			dispatch(setaddclient());
		}
		
	}

}
class AddClient extends React.Component {
	
	constructor(props) {
		super(props)
		this.state={
			size:"default",
			isauthenticated:true,
			ct_name :"",
			ct_street_number:"",
			ct_street_name:"",
			ct_city_name:"",
			ct_pin:"",
			
		}
		this.handleMenuClick = this.handleMenuClick.bind(this);
		this.validateUser = this.validateUser.bind(this);
		this.Onchange = this.Onchange.bind(this);
		this.reset = this.reset.bind(this);
		this.status = this.status.bind(this);
	
	}

	 handleMenuClick = (e)=> {
			  console.log('click', e);
		}

	componentWillReceiveProps = (nextProps)=>{

		if ( nextProps.addClientSuccess == true && nextProps.msg.length > 0){
			this.reset();
			this.props.setaddclient();
			success(nextProps.msg);
		}

		if( nextProps.addClientSuccess == false && nextProps.msg.length > 0){	
				error(nextProps.msg);
		}
		


	}

	componentDidMount(){
	  
	  
	   this.props.setaddclient();
	   
		
	}
	componentWillMount(){
	
		let v = this.validateUser();
		this.setState({
			isValidated: v,
			
			
		});
	}
	validateUser = ()=>{
		
		if(this.props.role == false){
			return false
		}
	}
	Onchange = (e)=>{
		this.setState({
			[e.target.name]:e.target.value
		})

	}

	isvalidated = ()=>{
		if (this.props.role !== 'staff'){
			return true;
		}
	}

	status =() =>{

		if (this.props.msg != "") {
	   		if (this.props.addClientSuccess) {
	   			success(this.props.msg)
	   		} else {
	   			error(this.props.msg)
	   		}
		} 

	}

	reset = ()=>{
		console.log(this.state);
		this.setState({
			ct_name :"",
			ct_id:this.props.nextClientId,
			ct_street_name:"",
			ct_pin:"",
			ct_street_number:"",
			ct_city_name:""
		})
		console.log(this.state);
	}

	Onsubmit = (e)=>{
		e.preventDefault();
		var  data = {};
		data.ct_name = this.state.ct_name;
		data.ct_city_name = this.state.ct_city_name;
		data.ct_street_number = this.state.ct_street_number;
		data.ct_street_name = this.state.ct_street_name;
		data.ct_pin = this.state.ct_pin;
		this.props.addClient(data);
	}
	
	render(){
		const menu = (
			  <Menu onClick={this.handleMenuClick}>
			    <Menu.Item key="1"><Icon type="user" />1st menu item</Menu.Item>
			    <Menu.Item key="2"><Icon type="user" />2nd menu item</Menu.Item>
			    <Menu.Item key="3"><Icon type="user" />3rd item</Menu.Item>
			  </Menu>
			);

		return(
			<div>
			{this.isvalidated() ? null : <Redirect to ='/PageNotFound'/>}
			{

			this.state.isauthenticated ?
			<div>
				
				<Row style={{padding:'5px'}}>
					<Col xs={2} sm={2} md={4} lg={5} >
					{ this.props.addClientSuccess ? this.status : null}
					</Col>
					<Col xs={20} sm={20} md={16} lg={14}>
						
						<Row>
							<Col>
								<form onSubmit ={this.Onsubmit}>
								<Row>
									<Col xs={12} sm={12} md={12} lg={12} style={LabelStyle} >
										<label >Client Name</label>
									</Col>
									<Col xs={12} sm={12} md={12} lg={12}>
										<Input name = "ct_name" value= {this.state.ct_name}style={InputStyle} onChange={this.Onchange} required />
								           
									</Col>
								</Row>
								
								<Row>
									<Col xs={12} sm={12} md={12} lg={12} style={LabelStyle}>
										<label style={LabelStyle}>Street Number</label>
									</Col>
									<Col xs={12} sm={12} md={12} lg={12}>
										<Input name="ct_street_number" value= {this.state.ct_street_number} style={InputStyle} onChange={this.Onchange} required / >

									</Col>
								</Row>
								<Row>
									<Col xs={12} sm={12} md={12} lg={12} style={LabelStyle}>
										<label>Street Name</label>
									</Col>
									<Col xs={12} sm={12} md={12} lg={12}>
										<Input name = "ct_street_name" value= {this.state.ct_street_name} style={InputStyle} onChange={this.Onchange} required />
									</Col>

								</Row>
								<Row>
									<Col xs={12} sm={12} md={12} lg={12} style={LabelStyle}>
										<label>City Name</label>
									</Col>
									<Col xs={12} sm={12} md={12} lg={12}>
										<Input name = "ct_city_name" value= {this.state.ct_city_name} style={InputStyle} onChange={this.Onchange} required />
									</Col>

								</Row>
								<Row>
									<Col xs={12} sm={12} md={12} lg={12} style={LabelStyle}>
										<label>Pin Code</label>
									</Col>
									<Col xs={12} sm={12} md={12} lg={12}>
										<Input name="ct_pin"  placeholder="Please enter AlphaNumeric Pincode"  pattern="^[0-9a-zA-Z_ ]{1,8}$" style={InputStyle} value= {this.state.ct_pin} onChange={this.Onchange} required/>
									</Col>

								</Row>
								<Row style={{paddingTop:"10px"}}>
									<Col xs={12} sm={12} md={12} lg={12}>
										<Input type="submit" disabled = {this.props.statusInd} style={submitStyle} value = "Add"/>
									</Col>
									<Col xs={12} sm={12} md={12} lg={12}>
										<Button type="danger " style={submitStyle} disabled={this.props.statusInd} onClick={this.reset}>Reset</Button>
									</Col>
								</Row>
						          
						          </form>
							</Col>
							<Col>

							</Col>
						</Row>
					</Col>
					<Col xs={2} sm={2} md={4} lg={5} >
					</Col>
				</Row>
			</div>
			:
			 <Redirect to='/PageNotFound'/>
		}
		</div>
			
			);
	}
}
export default connect(mapStateToProps,mapDispatchToProps)(AddClient);