import React from 'react';
import {Row, Col } from 'antd';
import { Select,Input,Button ,message} from 'antd';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {Table,Divider} from "antd";
import {DatePicker} from 'antd';
import {getAdminDashboardDetails} from './Actions';
import moment from 'moment';

const { Column, ColumnGroup } = Table;

const mapDispatchToProps = (dispatch)=>{
	return{
		getAdminDashboardDetails :(data)=>{
			dispatch(getAdminDashboardDetails(data))
		},
		
	}

}

const mapStateToProps = (state)=>{
	return{
		role : state.Reducer.user.Role,
		adminDashboardJobs : state.Reducer.adminDashboardJobs,
		UserId : state.Reducer.user.UserId,
	}
}

class AdminDashboard extends React.Component{

constructor(props){
		super(props);
		this.state = {
			date: moment(),
			date_string :moment().format().slice(0,10),
		}
	}
OnchangeDate = (value, datestring)=>{

		this.setState({
			date: value,
			date_string :datestring,
		})
		
		this.props.getAdminDashboardDetails(datestring);

	}
componentDidMount(){

	this.props.getAdminDashboardDetails(this.state.date_string);
}


loadClick = ()=>{
	this.props.getAdminDashboardDetails(this.state.date_string);
}

isvalidated = ()=>{
		if (this.props.role !== 'staff'){
			return true;
		}
	}

render(){

	return(
		<div>
				{this.isvalidated() ? null : <Redirect to ='/PageNotFound'/>}
				<Divider style={{backgroundColor:"#5f5f5f"}}>
						<span style={{color:"white"}}>SCHEDULES</span> 
					</Divider>
				<Row>
					<Col>
						<lable> <b>Select Date </b> </lable>
						<DatePicker value={this.state.date}  onChange = {this.OnchangeDate} />
					</Col>
					<Col>
						
					</Col>
					
				</Row>
				<Table
					pagination= { {pageSizeOptions: ['5','10','15','20','50','100'], showSizeChanger: true}}
					size="medium"
					dataSource={this.props.adminDashboardJobs}
					scroll={{ x: 1000 }}
				>
					<Column 
						title="JOB ID"
						dataIndex="jobid"
						key="jobid" />

						<Column 
						title="CLINET"
						dataIndex="client"
						key="client" />

						
						<Column 
						title="STAFF NAME"
						dataIndex="Fname"	
						key="Fname" />

						<Column
						title="STAFF TYPE"
						dataIndex="staff_type"
						key="staff_type" />

						<Column
						title="DATE"
						dataIndex="date"
						key="date" />

						<Column
						title="START_TIME"
						dataIndex="start_time"
						key="from_time" />

						<Column
						title="END_TIME"
						dataIndex="end_time"
						key="to_time" />

						<Column
						title="SHIFT_TYPE"
						dataIndex="shift_type"
						key="shift_type" />

										
				</Table>
		</div>

)}

}

export default connect (mapStateToProps,mapDispatchToProps) (AdminDashboard)