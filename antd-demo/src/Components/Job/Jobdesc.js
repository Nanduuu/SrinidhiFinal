import React from 'react';
import  {Row,Col} from 'antd';
import {Button,message, Dropdown}  from 'antd';
import  {Menu, Icon,TimePicker} from 'antd';
import {Select,DatePicker ,InputNumber,Input} from 'antd';
import moment from 'moment';
import {Redirect}  from 'react-router-dom';
import {connect} from 'react-redux';
import {activegetClients, getShiftDetails} from './Actions';
import {addJob,setaddjob} from './Actions';
import { Radio } from 'antd';

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

const format = 'HH:mm:ss';
const Option = Select.Option;
const InputStyle={
	width:"100%",
	padding:"5px 5px"
}
const LabelStyle = {

	textAlign:"center",
	paddingTop:"10px"
}
const submitStyle = {
	width:"90%"
}

const success = (text)=>{
    message.success(text);
}

const error = (text)=>{
  message.error(text);
}

const mapStateToProps = (state)=>{
	console.log(state.Reducer.user.Role)
	return {
		role : state.Reducer.user.Role,
		activeClients:state.ClientDetails.activeClients,
		shiftDetails : state.ClientDetails.shiftDetails,
		addJobflag : state.Reducer.addJobflag,
		addJobMsg : state.Reducer.addJobMsg,
	}

}
const mapDispatchToProps = (dispatch)=>{
	return{
		activegetClients : ( )=>{
			dispatch(activegetClients());
		},
		getShiftDetails :(data)=>{
				dispatch(getShiftDetails(data));
		},
		addJob : (data)=>{
			dispatch(addJob(data));
		},
		setaddjob : ()=>{
			dispatch(setaddjob());
		}		
	}

}
const infoError = (text) => {
			  message.error(text);
			};
class Jobdesc extends React.Component {
	
	constructor(props) {
		super(props)
		this.state={

			size:"default",
			staff : "",
			client : "",
			date : null,
			count : null,
			shift_id:null,
			
			
		}
		
		this.loadClients = this.loadClients.bind(this);
		this.OnchangeDate = this.OnchangeDate.bind(this);
		this.Onsubmit = this.Onsubmit.bind(this);
		this.reset = this.reset.bind(this);
		this.handleChangeStaff = this.handleChangeStaff.bind(this);
		this.handleChangeClient = this.handleChangeClient.bind(this);
		this.OnchangeCount = this.OnchangeCount.bind(this);
		this.disabledDate = this.disabledDate.bind(this);
	}

	componentWillReceiveProps = (nextProps)=>{

		if ( nextProps.addJobflag == true && nextProps.addJobMsg.length > 0){
			this.reset();
			this.props.setaddjob();
			success(nextProps.addJobMsg);
		}

		if( nextProps.addJobflag == false && nextProps.addJobflag.length > 0){	
				error(nextProps.addJobMsg);
		}
	}

	disabledDate = (current)=>{
			return  current <= moment().endOf('Yesterday') ;
			
	}

	OnchangeDate = (value, datestring)=>{
		
		this.setState({
			date : moment.utc(value),
		})
	}
	OnchangeCount = (value)=>{

		this.setState({
			count : value
		})

	}

	handleChangeStaff = (value)=> {
	  
	  this.setState({
	  	staff : value
	  })
	}
	handleChangeClient = (value)=> {
	 
	   this.props.getShiftDetails(value);
	  this.setState({
	  	client : value,
	  	shift_id:null,

	  })
	 
	}

	OnShiftChange = (value)=>{
		this.setState({
			shift_id:value,
		})
	}

	reset = ()=>{
		
		this.setState({

			staff : "",
			client : "",
			date : null,
			count : null,
			shift_id:null,
			
		})
		
	}
	Onsubmit = ()=>{
		
		var flag = true;
		if (
			this.state.staff == null ||
			this.state.client == null ||
			this.state.date == null ||
			this.state.shift_id == null ||
			this.state.count == null||
			this.state.count == 0 ){
			infoError ('Please Fill all the fields');
			flag = false;
		}
		
		if(flag == true){
			var data = {
				staff : this.state.staff,
				client : this.state.client,
				date :this.state.date.format("YYYY-MM-DDTHH:mm:ssZ"),
				shift_id: this.state.shift_id,
				count: this.state.count,
			}
			this.props.addJob(data);
		}
		
	}

	
	componentDidMount(){
		this.props.activegetClients();
	}
		
	loadClients = (clients)=>{
     const listItems = clients.map((number) =>
						  <Option key = {number} value={number}>{number}</Option>
						);
		return listItems;
	}

	loadShifts = (shifts)=>{
     const listShifts = shifts.map((shift) =>
						  <Option style={{width:"100%"}} value={shift.shift_id}>{shift.shift_type + " <> " + shift.start_time.slice(0,5) + '-' + shift.end_time.slice(0,5)}</Option>
						);
		return listShifts;
	}
	

	render(){
		
		const today = new Date();
		return(
			<div>
				
				<Row>
					<Col>
					</Col>
				</Row>
				<Row>
					<Col xs={2} sm={2} md={4} lg={5} >
					</Col>
					<Col xs={20} sm={20} md={16} lg={14}>
						<form onSubmit ={this.Onsubmit}>
						<Row>
							<Col>
								<Row>
									<Col xs={8} sm={8} md={12} lg={12} style={LabelStyle} >
										<label > <b>Doctor/Nurse </b></label>
									</Col>
									<Col xs={16} sm={16} md={12} lg={12}>
										<Select value = {this.state.staff} onChange={this.handleChangeStaff}  style={InputStyle} required>
								            <Option value="Doctor">Doctor</Option>
								            <Option value="Nurse">Nurse</Option>
								            <Option value="Health Care assistant (HCA)">Health Care assistant (HCA)</Option>
								            <Option value="Domestic worker">Domestic worker</Option>
								            <Option value="Domestic assistant">Domestic assistant</Option>
								            <Option value="Domiciliary carer">Domiciliary carer</Option>
								          </Select>
									</Col>

								</Row>
								<Row>
									<Col xs={8} sm={8} md={12} lg={12} style={LabelStyle}>
										<label><b>Select Client</b></label>
									</Col>
									<Col xs={16} sm={16} md={12} lg={12}>
										<Select value={this.state.client} onChange={this.handleChangeClient} required style={InputStyle}>
								            {this.loadClients(this.props.activeClients)}
								          </Select>

									</Col>
								</Row>
								<Row>
									<Col xs={8} sm={8} md={12} lg={12} style={LabelStyle}>
										<label style={LabelStyle}> <b>Date </b></label>
									</Col>
									<Col xs={16} sm={16} md={12} lg={12}>
										<DatePicker value={this.state.date}  disabledDate={this.disabledDate}  onChange = {this.OnchangeDate} required size={this.size} style={InputStyle}/>

									</Col>
								</Row>
								<Row>
									<Col xs={8} sm={8} md={12} lg={12} style={LabelStyle}>
										<label> <b>No. of positions</b></label>
									</Col>
									<Col xs={16} sm={16} md={12} lg={12}>
										<InputNumber value = {this.state.count}onChange={this.OnchangeCount}  defaultValue={null} style={{width:"97%"} } required/>
									</Col>
								</Row>
								<Row>
									<Col xs={8} sm={8} md={12} lg={12} style={LabelStyle}>
										<label><b>Select Shift</b></label>
									</Col>
									<Col xs={16} sm={16} md={12} lg={12}>
										<Row>
											<div>
												<Select value={this.state.shift_id}  style={InputStyle} onChange={this.OnShiftChange}>
											        {this.loadShifts(this.props.shiftDetails)}
											    </Select>
										    </div>
										</Row>
									</Col>

								</Row>
								<Row style={{paddingTop:"10px"}}>
									<Col xs={12} sm={12} md={12} lg={12}>
										<Button type="primary"  onClick = {this.Onsubmit} style={submitStyle}>Broadcast</Button>
									</Col>
									<Col xs={12} sm={12} md={12} lg={12}>
										<Button type="danger" onClick={this.reset} style={submitStyle}>Cancel</Button>
									</Col>
								</Row>
						          
						          
							</Col>
							<Col>

							</Col>
						</Row>
					</form>
					</Col>
					<Col xs={2} sm={2} md={4} lg={5} >
					</Col>
				</Row>
			</div>
			)
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(Jobdesc);