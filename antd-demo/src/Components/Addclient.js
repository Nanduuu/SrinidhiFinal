import React from 'react';
import {Row,Col} from 'antd';
import {Button, Dropdown,Input}  from 'antd';
import {Menu, Icon,TimePicker} from 'antd';
import {Select,message,DatePicker ,InputNumber} from 'antd';
import moment from 'moment';
import {Redirect} from 'react-router-dom';
import { connect } from 'react-redux';
import {addClient,beginAddCleint,setaddclient} from '../Redux/Actions';
import { Divider } from 'antd';
import DeleteClient from "./DeleteClient";
import EditClient from "./EditClient";
import DeleteShifts from "./DeleteShifts";

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
        userName: state.user.Fname,
        authenticated:state.isauthenticated,
        statusInd : state.actions.addclient,
        msg:state.addClientMsg,
        role : state.user.Role,
        addClientSuccess: state.addClientSuccess,
       
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
class Addclient extends React.Component {
	
	constructor(props) {
		super(props)
		this.state={
			size:"default",
			isauthenticated:true,
			ct_name :"",
			ct_add:"",
			ct_pin:"",
			ct_branch:""
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
			ct_add:"",
			ct_pin:"",
			ct_branch:""
		})
		console.log(this.state);
	}

	Onsubmit = (e)=>{
		e.preventDefault();
		var  data = {};
		data.ct_name = this.state.ct_name;
		data.ct_id = this.state.ct_id;
		data.ct_branch = this.state.ct_branch;
		data.ct_add = this.state.ct_add;
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
				<Divider style={{backgroundColor:"#4479a1"}}>
					<span style={{color:"white"}}>ADD CLIENT</span> 
				</Divider>
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
										<Input name = "ct_name" autoFocus value= {this.state.ct_name}style={InputStyle} onChange={this.Onchange} required />
								           
									</Col>
								</Row>
								
								<Row>
									<Col xs={12} sm={12} md={12} lg={12} style={LabelStyle}>
										<label style={LabelStyle}>Address</label>
									</Col>
									<Col xs={12} sm={12} md={12} lg={12}>
										<TextArea name="ct_add" value= {this.state.ct_add} style={InputStyle} onChange={this.Onchange} required / >

									</Col>
								</Row>
								<Row>
									<Col xs={12} sm={12} md={12} lg={12} style={LabelStyle}>
										<label>Branch Name</label>
									</Col>
									<Col xs={12} sm={12} md={12} lg={12}>
										<Input name = "ct_branch" value= {this.state.ct_branch} style={InputStyle} onChange={this.Onchange} required />
									</Col>

								</Row>
								<Row>
									<Col xs={12} sm={12} md={12} lg={12} style={LabelStyle}>
										<label>Pin Code</label>
									</Col>
									<Col xs={12} sm={12} md={12} lg={12}>
										<Input name="ct_pin"  placeholder="Please enter AlphaNumeric Pincode"  pattern="^[0-9,a-z,A-Z]{1,8}$" style={InputStyle} value= {this.state.ct_pin} onChange={this.Onchange} required/>
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
				<Divider style={{backgroundColor:"#4479a1"}}>
					<span style={{color:"white"}}>ENABLE / DISABLE CLIENT</span> 
				</Divider>
				<DeleteClient/>
				<Divider style={{backgroundColor:"#4479a1"}}>
					<span style={{color:"white"}}>EDIT CLIENT</span> 
				</Divider>
				<EditClient/>
				<Divider style={{backgroundColor:"#4479a1"}}>
					<span style={{color:"white"}}>ADD SHIFTS</span> 
				</Divider>
				<Row>
					<Col xs={2} sm={2} md={4} lg={5} >
					</Col>
					<Col xs={20} sm={20} md={16} lg={14} >
						<Row>
								<Col xs={8} sm={8} md={12} lg={12} style={LabelStyle}>
										<label>Select Client</label>
								</Col>
								<Col xs={16} sm={16} md={12} lg={12}>
									<Select value={this.state.client} onChange={this.handleChangeClient} required style={InputStyle}>
								           {}
								    </Select>
								</Col>
						</Row>
						<Row>
								<Col xs={8} sm={8} md={12} lg={12} style={LabelStyle}>
									<label>Duration</label>
								</Col>
									<Col xs={16} sm={16} md={12} lg={12}>
										<Row>
										<Col xs={12} sm={12} md={12} lg={12}>
											<TimePicker value={this.state.from_time} onChange = {this.OnchangeFromTime} defaultValue={moment('08', format)} format={format} style={InputStyle} required/>
										</Col>

										<Col xs={12} sm={12} md={12} lg={12}>
											<TimePicker value={this.state.to_time} onChange = {this.OnchangeToTime} defaultValue={moment('08', format)} format={format} style={InputStyle} required />
										</Col>
										</Row>
									</Col>

						</Row>
						<Row>
									<Col xs={8} sm={8} md={12} lg={12} style={LabelStyle} >
										<label >Shift Type</label>
									</Col>
									<Col xs={16} sm={16} md={12} lg={12}>
										<Select  onChange={this.handleChangeStaff}  style={InputStyle} required>
								            <Option value="Early">Early</Option>
								            <Option value="Late">Late</Option>
								            <Option value="Long Day">Long Day</Option>
								            <Option value="Night">Night</Option>
								            <Option value="Saturday">Saturday</Option>
								            <Option value="Sunday">Sunday</Option>
								            <Option value="Sleep Night">Sleep Night</Option>
								          </Select>
									</Col>

						</Row>
						<Row style={{paddingTop:"10px"}}>
									<Col xs={12} sm={12} md={12} lg={12}>
										<Button type="primary" style={submitStyle} >Add </Button>
									</Col>
									<Col xs={12} sm={12} md={12} lg={12}>
										<Button type="danger " style={submitStyle} disabled={this.props.statusInd}>Reset</Button>
									</Col>
						</Row>
					</Col>
					<Col xs={2} sm={2} md={4} lg={5} >
					</Col>
				</Row>
				<Divider style={{backgroundColor:"#4479a1"}}>
					<span style={{color:"white"}}>DELETE SHIFTS</span> 
				</Divider>
				<DeleteShifts/>
				

			</div>
			:
			 <Redirect to='/PageNotFound'/>
		}
		</div>
			
			);
	}
}
export default connect(mapStateToProps,mapDispatchToProps)(Addclient);