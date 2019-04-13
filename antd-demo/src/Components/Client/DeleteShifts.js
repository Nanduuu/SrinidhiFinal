import React from 'react';
import {Row, Col } from 'antd';
import { Select,Input,Button ,message} from 'antd';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {Table} from "antd";
import {activegetClients, getShiftDetails} from './Actions';
import axios from 'axios';
const { Column, ColumnGroup } = Table;
const Option = Select.Option;




const { TextArea } = Input;
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
		shiftDetails : state.ClientDetails.shiftDetails,
			
	}
}

const mapDispatchToProps =(dispatch)=>{
	return{
			activegetClients :()=>{
				dispatch(activegetClients())
			},
			getShiftDetails :(data)=>{
				dispatch(getShiftDetails(data));
			},
		}
	}

class DeleteShifts extends React.Component{

constructor(props){
		super(props);
		this.state = {
			ct_name:"",
		}
		
	}
componentDidMount(){
	
	this.props.activegetClients();
	
}

componentWillReceiveProps(nextprops){

	if(nextprops.shiftDetails != this.props.shiftDetails){
		this.props.getShiftDetails(this.state.ct_name)
	}

}

OnClientChange = (value)=>{
		this.setState({
			ct_name:value,
		})
		this.props.getShiftDetails(value)
	}

loadClients = (clients)=>{
     const listItems = clients.map((number) =>
						  <Option key = {number} value={number}>{number}</Option>
						);
		return listItems;
	}

delete = (record)=>{

	console.log(record)
	axios.post('/api/deleteShift/',record).then(function(result){
		console.log(result)
		if(result.data.success==true){
			success(result.data.msg)
			//this.props.getShiftDetails(this.state.ct_name);
		}else{
			console.log(result)
			error(result.data.msg)
		}
	}).catch(function(err){
		console.log(err)
		error("Error while connecting to server")
	})

}


render(){
	return(
		<div>
			<Row style={{padding:'5px'}}>
					<Col xs={0} sm={0} md={4} lg={5} >
					</Col>
					<Col xs={24} sm={24} md={16} lg={14}>
						<Row>
							<Col>
								<Row>
									<Col xs={12} sm={12} md={12} lg={12} style={LabelStyle} >
										<label > <b>Select Client</b> </label>
									</Col>
									<Col xs={12} sm={12} md={12} lg={12}>
										<Select  onChange={this.OnClientChange} value = {this.state.ct_name}required style={InputStyle}>
								           {this.loadClients(this.props.clients)}
								    </Select>
									</Col>
								</Row>
								<Row>
									<Table
										pagination= { {pageSizeOptions: ['5','10'], showSizeChanger: true}}
										
										dataSource={this.props.shiftDetails}
										scroll={{ x: 800 }}
										>
									
										<Column 
											title="START TIME"
											dataIndex="start_time"
											key="START_TIME" />

									     <Column 
											title="END TIME"
											dataIndex="end_time"
											key="END_TIME" />

										<Column 
											title="SHIFT TYPE"
											dataIndex="shift_type"
											key="SHIFT_TYPE" />
										<Column
											title="ACTION"
										    dataIndex="ACTION"
											key="ACTION"
											
											render = { (text,record)=>{
												return (
													<Button onClick = {()=>{this.delete(record)}}>
													Delete
													</Button>
												)
											} }
										 />
									</Table>
								</Row>
								
								
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

export default connect(mapStateToProps,mapDispatchToProps)(DeleteShifts)