import React from 'react';
import {Row, Col} from 'antd';
import { Select,Input,Button } from 'antd';
import { Divider,TimePicker ,InputNumber,DatePicker} from 'antd';
import moment from'moment';
import {message} from 'antd';
import {connect} from 'react-redux';
import { getJob,activegetClients, updatejobdetails, resetEditJob} from './Actions';

const Option = Select.Option;

const LabelStyle = {
	textAlign:"center",
	paddingTop:"10px"
}

const InputStyle={
	width:"100%",
	padding:"1px",
	margin:'1px',
}

const error = (text)=>{
	message.error(text);
}

const success = (text)=>{
	message.success(text);
}

const mapStateToProps = (state)=>{
	return {
		role : state.Reducer.user.Role,
		activeClients : state.ClientDetails.activeClients,
		job : state.Reducer.job,
		editJobMsg : state.Reducer.editJobMsg,
		editJobFlag : state.Reducer.editJobFlag,
	}
}
const mapDispatchToProps = (dispatch)=>{
	return{
		activegetClients : ( )=>{
			dispatch(activegetClients());
		},
		getJob:(data)=>{
				dispatch(getJob(data));
		},
		updatejobdetails :(data)=>{
			dispatch(updatejobdetails(data));
		},
		resetEditJob :()=>{
			dispatch(resetEditJob());
		}
	}
}
class EditJob extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			disabled : true,
			disabledJobId : false,
			jobid:"",
			staff : "Doctor",
			shift_id:null,
			client : undefined,
			date : moment("2001-01-01"),
			count : 10,
			
			save_enable : true,
			edit_enable : false,
		}
		this.reset = this.reset.bind(this);
		this.jobidOnChange = this.jobidOnChange.bind(this);
		this.loadClients = this.loadClients.bind(this);
		this.OnchangeDate = this.OnchangeDate.bind(this);
		this.Onsubmit = this.Onsubmit.bind(this);
		this.reset = this.reset.bind(this);
		this.handleChangeStaff = this.handleChangeStaff.bind(this);
		this.handleChangeClient = this.handleChangeClient.bind(this);
		this.OnchangeCount = this.OnchangeCount.bind(this);
		this.disabledDate = this.disabledDate.bind(this);
	}
	jobidOnChange = (e)=>{
		this.setState({
			[e.target.name] : e.target.value,
		})
	}
	loadJob =()=>{
		if(isNaN(this.state.jobid) || this.state.jobid == ""){
			error("Please enter the numeric jobid");
		}else{
			this.props.getJob(this.state.jobid);
			this.props.activegetClients();
		}
	}
	Onsubmit =()=>{
		var flag = true;
		if (this.state.staff == null ||
			this.state.client == null ||
			this.state.date == null ||
			this.state.from_time == null ||
			this.state.to_time == null ||
			this.state.count == "" ){
			error ('Please Fill all the fields');
			flag = false;
		}
		
		if(flag == true){
			var data = {

				jobid : this.state.jobid,
				staff : this.state.staff,
				client : this.state.client,
				date :this.state.date,
				from_time_string: this.state.from_time_string,
				to_time_string:this.state.to_time_string,
				count: this.state.count,
			}
			this.props.updatejobdetails(data);
			console.log(data);
		}
	}
	componentDidMount(){
		
		
	}
	componentWillReceiveProps(nextProps){
			

			if(nextProps.editJobFlag == true && nextProps.editJobMsg != "" ){
		   	
		   		success(nextProps.editJobMsg);

		   		this.reset();
		   		this.props.resetEditJob();
		   }

		   if(nextProps.editJobFlag == false && nextProps.editJobMsg != ""){
		   		 error(nextProps.editJobMsg);
		   		 this.props.resetEditJob();
		   }

		  if(nextProps.job != this.props.job && nextProps.job != null){
		   console.log(nextProps.job);	
		   debugger;
		   


		    this.setState({ 
		    				staff: nextProps.job.Staff,
		    				date: moment(nextProps.job.Date),
		    				disabled:false ,
		    				disabledJobId:true,
		    				save_enable : false,
		    				client : nextProps.job.Client,
		    				count : nextProps.job.Requested,
		    				shift_id : nextProps.job.shift_id,
		    				edit_enable : true,

		    			});
		   
		  }

	}
	loadClients = (clients)=>{
     const listItems = clients.map((number) =>
						  <Option key = {number} value={number}>{number}</Option>
						);
		return listItems;
	}
	disabledDate = (current)=>{
			return  current <= moment().endOf('Yesterday') ;
			
	}
	reset = ()=>{
		
		this.setState({
			jobid:null,
			staff : null,
			client : null,
			date : null,
			count : null,
			from_time : null,
			to_time : null,
			disabled:true,
			disabledJobId:false,
			save_enable : true,
			edit_enable : false,
		})
	}

	OnchangeDate = (value, datestring)=>{
		this.setState({
			date : moment(datestring),
			
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
	 
	  this.setState({
	  	client : value
	  })
	}

	render(){
		return(
				<div style={{margin:'20px'}}>
					
					<Row>
						<Col xs= {1} sm={1} md={2} lg={3}>
			      		</Col>
						<Col xs={22} sm={22} md={20} lg={18}>
							<Row>
								<Col xs={6} sm={8} md={8} lg={8} style={LabelStyle}>
									<lable style={InputStyle}> Enter Job ID </lable>
								</Col>
								<Col xs={18} sm={8} md={8} lg={8} >
									<Input disabled={this.state.disabledJobId} style={InputStyle} name='jobid' value={this.state.jobid} onChange={this.jobidOnChange} />
								</Col>
								<Col xs={0} sm={8} md={8} lg={8} >
									
								</Col>
							</Row>
							<Row>
								<Col xs={6} sm={8} md={8} lg={8} style={LabelStyle}>
									<lable> Client </lable>
								</Col>
								<Col xs={18} sm={8} md={8} lg={8} >
									<Select disabled={this.state.disabled} value={this.state.client} onChange={this.handleChangeClient} required style={InputStyle}>
								            {this.loadClients(this.props.activeClients)}
								    </Select>
								</Col>
								<Col xs={0} sm={8} md={8} lg={8} >
									
								</Col>
							</Row>
							<Row>
								<Col xs={6} sm={8} md={8} lg={8} style={LabelStyle}>
									<lable> Date </lable>
								</Col>
								<Col xs={18} sm={8} md={8} lg={8} >
									<DatePicker value={this.state.date} disabled={this.state.disabled} defaultValue ={this.state.date} disabledDate={this.disabledDate}  onChange = {this.OnchangeDate} required size={this.size} style={InputStyle}/>
								</Col>
								<Col xs={0} sm={8} md={8} lg={8} >
									
								</Col>
							</Row>
							<Row>
								<Col xs={6} sm={8} md={8} lg={8} style={LabelStyle}>
									<lable> Staff </lable>
								</Col>
								<Col xs={18} sm={8} md={8} lg={8} >
									<Select  disabled={this.state.disabled} value = {this.state.staff} onChange={this.handleChangeStaff}  style={InputStyle} required>
								            <Option value="Doctor">Doctor</Option>
								            <Option value="Nurse">Nurse</Option>
								            <Option value="Health Care assistant (HCA)">Health Care assistant (HCA)</Option>
								            <Option value="Domestic worker">Domestic worker</Option>
								            <Option value="Domestic assistant">Domestic assistant</Option>
								            <Option value="Domiciliary carer">Domiciliary carer</Option>
								          </Select>
								</Col>
								<Col xs={0} sm={8} md={8} lg={8} >
									
								</Col>
							</Row>
							<Row>
								<Col xs={6} sm={8} md={8} lg={8} style={LabelStyle}>
									<lable> Shift </lable>
								</Col>
								<Col xs={18} sm={8} md={8} lg={8} >
									<Select disabled={this.state.disabled} value={this.state.shift_id} onChange={this.handleChangeClient} style={InputStyle}>
								            {}
								    </Select>
									
								</Col>
								<Col xs={0} sm={8} md={8} lg={8} >
								</Col>
							</Row>
							<Row>
								<Col xs={6} sm={8} md={8} lg={8} style={LabelStyle}>
									<lable> Requested </lable>
								</Col>
								<Col xs={18} sm={8} md={8} lg={8} >
									<InputNumber value={this.state.count} disabled={this.state.disabled} onChange={this.OnchangeCount}  min={1} max={100} defaultValue={this.state.count} style={InputStyle} disabled ={ this.state.disabled } />
								</Col>
								<Col xs={0} sm={8} md={8} lg={8} >
									
								</Col>
							</Row>
							<Row>
								<Col style={LabelStyle} >
								<Button disabled={this.state.edit_enable} onClick={this.loadJob}  type="primary">Edit Job</Button>
								<Button disabled = {this.state.save_enable} onClick ={this.Onsubmit}>Save</Button>
								<Button disabled = {this.state.save_enable} onClick = {this.reset}>Cancel</Button>
								</Col>
								
							</Row>
						</Col>
						<Col xs= {1} sm={1} md={2} lg={3}>
			      		</Col>
					</Row>
				</div>
			)
	}
}

export default connect (mapStateToProps,mapDispatchToProps)(EditJob);