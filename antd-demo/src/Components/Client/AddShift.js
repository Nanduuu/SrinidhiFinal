import React from 'react';
import {Row,Col} from 'antd';
import {Button, Dropdown,Input}  from 'antd';
import {Menu, Icon,TimePicker} from 'antd';
import {Select,message,DatePicker ,InputNumber} from 'antd';
import moment from 'moment';
import {Redirect} from 'react-router-dom';
import { connect } from 'react-redux';
import { Divider } from 'antd';
import{activegetClients,addShift} from './Actions';

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

const mapStateToProps = (state)=>{
	return{
		clients : state.ClientDetails.activeClients,
		addShiftFlag : state.ClientDetails.addShiftFlag,
		addShiftMsg :state.ClientDetails.addShiftMsg,
		
	}
}

const mapDispatchToProps =(dispatch)=>{
	return{
			activegetClients : ()=>{
				dispatch(activegetClients());
			},
			addShift:(data)=>{
				dispatch(addShift(data))
			},
		}
	}



class AddShift extends React.Component{

	constructor(props){
		super(props)
		this.state = {
			ct_name:"",
			start_time:null,
			start_time_string:"",
			end_time:null,
			end_time_string:"",
			shift_type:"",


		}
	}

	componentWillReceiveProps = (nextProps)=>{
		console.log(nextProps.clients);
		if ( nextProps.clients.length == 0 ){
			this.props.activegetClients();
		}

		if(nextProps.addShiftMsg != ""){
			if(nextProps.addShiftFlag== true){
				success(nextProps.addShiftMsg);
				this.reset();
			}
			if(nextProps.addShiftFlag == false){
				error(nextProps.addShiftMsg);
			}
		}

		
	}	
	componentDidMount(){
		this.props.activegetClients();
	}

	reset = ()=>{
			this.setState({
				ct_name:"",
				start_time:null,
				end_time:null,
				shift_type:"",
				end_time_string:"",
				start_time_string:"",
			})
	}

	OnchangeStartTime = (time,timestring)=>{
		console.log(timestring);
		this.setState({
			start_time : time,
			start_time_string:timestring
		})
		
	}

	OnchangeEndTime = (time,timestring)=>{

		this.setState({
			end_time : time,
			end_time_string:timestring
		})

	}

	OnClientChange = (value)=>{
		this.setState({
			ct_name:value,
		})
	}
	OnShiftChange = (value)=>{
		this.setState({
			shift_type:value,
		})
	}

	OnSubmit =()=>{
		if(!this.state.ct_name || !this.state.start_time_string || !this.state.end_time_string || !this.state.shift_type){
			error("Please fill all the fields");
		}else{
			var temp = this.state;
			var input={
				ct_name : temp.ct_name,
				start_time_string : temp.start_time_string,
				end_time_string : temp.end_time_string,
				shift_type:temp.shift_type,
			}
			this.props.addShift(input);

		}
	}

	loadClients = (clients)=>{
     const listItems = clients.map((number) =>
						  <Option key = {number} value={number}>{number}</Option>
						);
		return listItems;
	}


render(){
	return(
			<div>
			<Row>
					<Col xs={0} sm={0} md={4} lg={5} >
					</Col>
					<Col xs={24} sm={24} md={16} lg={14} >
						<Row>
								<Col xs={8} sm={8} md={12} lg={12} style={LabelStyle}>
										<label>Select Client</label>
								</Col>
								<Col xs={16} sm={16} md={12} lg={12}>
									<Select  onChange={this.OnClientChange} value = {this.state.ct_name}required style={InputStyle}>
								           {this.loadClients(this.props.clients)}
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
											<TimePicker value={this.state.start_time} onChange = {this.OnchangeStartTime}  format={format} style={InputStyle} required/>
										</Col>

										<Col xs={12} sm={12} md={12} lg={12}>
											<TimePicker value={this.state.end_time} onChange = {this.OnchangeEndTime}  format={format} style={InputStyle} required />
										</Col>
										</Row>
									</Col>

						</Row>
						<Row>
									<Col xs={8} sm={8} md={12} lg={12} style={LabelStyle} >
										<label >Shift Type</label>
									</Col>
									<Col xs={16} sm={16} md={12} lg={12}>
										<Select  onChange={this.OnShiftChange} value={this.state.shift_type} style={InputStyle} >
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
										<Button type="primary" onClick={this.OnSubmit} style={submitStyle} >Add </Button>
									</Col>
									<Col xs={12} sm={12} md={12} lg={12}>
										<Button type="danger " style={submitStyle} onClick={this.reset}>Reset</Button>
									</Col>
						</Row>
					</Col>
					<Col xs={0} sm={0} md={4} lg={5} >
					</Col>
				</Row>
			</div>

		)

	}



}

export default connect(mapStateToProps,mapDispatchToProps) (AddShift);

