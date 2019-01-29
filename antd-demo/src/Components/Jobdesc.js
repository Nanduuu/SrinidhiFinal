import React from 'react';
import  {Row,Col} from 'antd';
import {Button,message, Dropdown}  from 'antd';
import  {Menu, Icon,TimePicker} from 'antd';
import {Select,DatePicker ,InputNumber,Input} from 'antd';
import moment from 'moment';
import {Redirect}  from 'react-router-dom';
import {connect} from 'react-redux';
import {getClients} from '../Redux/Actions';
import {addJob,setaddjob} from '../Redux/Actions';

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
	console.log(state.user.Role)
	return {
		role : state.user.Role,
		clients:state.clients,
		addJobflag : state.addJobflag,
		addJobMsg : state.addJobMsg,
	}

}
const mapDispatchToProps = (dispatch)=>{
	return{
		getClients : ( )=>{
			dispatch(getClients());
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
			clients:[ ],
			staff : "",
			client : "",
			date : null,
			count : 0,
			from_time : null,
			from_time_string:null,
			to_time : null,
			to_time_string:null,
			
		}
		this.handleMenuClick = this.handleMenuClick.bind(this);
		this.isvalidated = this.isvalidated.bind(this);
		this.loadClients = this.loadClients.bind(this);
		this.OnchangeDate = this.OnchangeDate.bind(this);
		this.Onsubmit = this.Onsubmit.bind(this);
		this.reset = this.reset.bind(this);
		this.handleChangeStaff = this.handleChangeStaff.bind(this);
		this.handleChangeClient = this.handleChangeClient.bind(this);
		this.OnchangeCount = this.OnchangeCount.bind(this);
		this.OnchangeFromTime = this.OnchangeFromTime.bind(this);
		this.OnchangeToTime = this.OnchangeToTime.bind(this);
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
		 //alert(datestring)
		// var date = new Date(datestring);
		// date.setDate(date.getDate()+1);
		this.setState({
			date : value
		})
	}
	OnchangeCount = (value)=>{

		this.setState({
			count : value
		})

	}

	OnchangeFromTime = (time,timestring)=>{
		console.log(timestring);
		this.setState({
			from_time : time,
			from_time_string:timestring
		})
		
	}

	OnchangeToTime = (time,timestring)=>{

		this.setState({
			to_time : time,
			to_time_string:timestring
		})

	}

    handleChangeStaff = (value)=> {
	  
	  this.setState({
	  	staff : value
	  })
	}
	handleChangeClient = (value)=> {
	 
	  this.setState({
	  	client : value
	  })
	}

	reset = ()=>{
		
		this.setState({
			staff : null,
			client : null,
			date : null,
			count : null,
			from_time : null,
			to_time : null,
			
		})
		
	}
	Onsubmit = (e)=>{
		e.preventDefault();
		var flag = true;
		if (this.state.staff == null ||
			this.state.client == null ||
			this.state.date == null ||
			this.state.from_time == null ||
			this.state.to_time == null ||
			this.state.count == 0 ){
			infoError ('Please Fill all the fields');
			flag = false;
		}
		
		if(flag == true){
			var data = {
				staff : this.state.staff,
				client : this.state.client,
				date :this.state.date,
				from_time_string: this.state.from_time_string,
				to_time_string:this.state.to_time_string,
				count: this.state.count,

			}
			this.props.addJob(data);
		}
		
	}

	 handleMenuClick = (e)=> {
		  
		  console.log('click', e);
		}

	componentDidMount(){
		this.props.getClients();
		this.setState({
			clients:this.props.clients,
		})

	}
	isvalidated = ()=>{
		if (this.props.role !== 'staff'){
			return true;
		}
	}
	
	loadClients = (clients)=>{
     const listItems = clients.map((number) =>
						  <Option key = {number} value={number}>{number}</Option>
						);
		return listItems;
	}
	

	render(){
		
		const today = new Date();
		return(
			<div>
				{this.isvalidated() ? null : <Redirect to ='/PageNotFound'/>}
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
										<label >Docter/Nurse</label>
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
										<label>Select Client</label>
									</Col>
									<Col xs={16} sm={16} md={12} lg={12}>
										<Select value={this.state.client} onChange={this.handleChangeClient} required style={InputStyle}>
								            {this.loadClients(this.props.clients)}
								          </Select>

									</Col>
								</Row>
								<Row>
									<Col xs={8} sm={8} md={12} lg={12} style={LabelStyle}>
										<label style={LabelStyle}>Date</label>
									</Col>
									<Col xs={16} sm={16} md={12} lg={12}>
										<DatePicker value={this.state.date}  disabledDate={this.disabledDate}  onChange = {this.OnchangeDate} required size={this.size} style={InputStyle}/>

									</Col>
								</Row>
								<Row>
									<Col xs={8} sm={8} md={12} lg={12} style={LabelStyle}>
										<label>No. of positions</label>
									</Col>
									<Col xs={16} sm={16} md={12} lg={12}>
										<InputNumber value = {this.state.count }onChange={this.OnchangeCount}  min={1} max={100} defaultValue={null} style={{width:"97%"} } required/>
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
								<Row style={{paddingTop:"10px"}}>
									<Col xs={12} sm={12} md={12} lg={12}>
										<Input type="submit"  value = "Broadcast" onSubmit = {this.Onsubmit} style={submitStyle} />
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