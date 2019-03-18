import React from 'react';
import {Row, Col } from 'antd';
import { Select,Input,Button ,message} from 'antd';
import {connect} from 'react-redux';
//import {getClients,deleteClients} from '../Redux/Actions';
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
		
		UserId : state.Reducer.user.UserId,
	}
}

class AdminDashboard extends React.Component{

constructor(props){
		super(props);
		this.state = {
			date: moment(),
			date_string :"",
		}
	}

OnchangeDate = (value, datestring)=>{
		
		this.setState({
			date :value,
			date_string:datestring,
		})

		this.props.getAdminDashboardDetails(this.state.datestring);

	}

render(){
	return(
		<div>
				<Divider style={{backgroundColor:"#4479a1"}}>
						<span style={{color:"white"}}>SCHEDULES</span> 
					</Divider>
				<Row>
					<Col>
						<lable>Select date </lable>
					</Col>
					<Col>
						<DatePicker value={this.state.date}  onChange = {this.OnchangeDate} />
					</Col>
				</Row>
				<Table
					pagination= { {pageSizeOptions: ['5','10','15','20','50','100'], showSizeChanger: true}}
					size="default"
					dataSource={this.props.jobDetails}
					scroll={{ x: 1000 }}
				>
					<Column 
						title="JOB ID"
						dataIndex="START_TIME"
						key="START_TIME" />

						<Column 
						title="CLINET"
						dataIndex="END_TIME"
						key="END_TIME" />

						<Column 
						title="BRANCH"
						dataIndex="END_TIME"
						key="END_TIME" />

						<Column 
						title="STAFF NAME"
						dataIndex="SHIFT_TYPE"
						key="SHIFT_TYPE" />

						<Column
						title="STAFF TYPE"
						dataIndex="ACTION"
						key="ACTION" />

						<Column
						title="DATE"
						dataIndex="ACTION"
						key="ACTION" />

						<Column
						title="START_TIME"
						dataIndex="ACTION"
						key="ACTION" />

						<Column
						title="END_TIME"
						dataIndex="ACTION"
						key="ACTION" />

						<Column
						title="SHIFT_TYPE"
						dataIndex="ACTION"
						key="ACTION" />

										
				</Table>
		</div>

)}

}

export default connect (mapStateToProps,mapDispatchToProps) (AdminDashboard)