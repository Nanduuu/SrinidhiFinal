import React from 'react';
import { Table, Divider, Tag ,DatePicker, Button ,message} from 'antd';
import {Row, Col } from 'antd';
import {connect} from 'react-redux';
import {Redirect}  from 'react-router-dom';
import {getStaffJobDetails,deleteStaffJobs} from './Actions';
import moment from 'moment';

const error = (data)=>{
	message.error(data);
}

const { MonthPicker, RangePicker } = DatePicker;
const { Column, ColumnGroup } = Table;

const columns = [{
  title: 'JobId',
  dataIndex: 'jobid',
  key: 'JobId',
  fixed :'left',
},{
  title: 'Hospital',
  dataIndex: 'client',
  key: 'Hospital',
},{title: 'Date',
  dataIndex: 'date',
  key: 'Date',
},{
  title: 'Start Time',
  dataIndex: 'start_time',
  key: 'Time',
}, {
  title: 'End Time',
  dataIndex: 'end_time',
  key: 'Time',
}, 
{
  title: 'Action',
  dataIndex: 'Action',
  key: 'Action',
  fixed : 'right',
  width: 100,
  render: (text, record) => (
    <span>
       <a href="javascript:;">Decline</a>
    </span>
  ),
}];


const mapStateToProps = (state)=>{
	return{
		role : state.Reducer.user.Role,
		staffScheduledJobs: state.StaffDashboard.staffScheduledJobs,
		UserId : state.Reducer.user.UserId,
	}
}

const mapDispatchToProps = (dispatch)=>{
	return{
		getStaffJobDetails :(data)=>{
			dispatch(getStaffJobDetails(data))
		},
		deleteStaffJobs :(data)=>{
			dispatch(deleteStaffJobs(data))
		}
		
	}

}

class StaffJobDetails extends React.Component{

	constructor(props){
		super(props);
		this.state = {
			
			from_date : null,
			to_date : null,
			selectedRows:[],
			selectedRowKeys: [],
			rowsSelected : true,
			
			
		}
	}

	isvalidated = ()=>{
    if (this.props.role === 'staff'){
      return true;
    }
  }

	OnChangeDate = (value,dateString)=>{
		console.log(dateString);
		this.setState({
		from_date : dateString[0],
		to_date : dateString[1],
	//	from_date : value[0],
	//	to_date : value[1],
		})

	}
	
	loadJobs = ()=>{
		let data = {};


		if(this.state.from_date == null){

			let startDate =  new Date();
			let endDate = new Date();
			endDate.setDate(endDate.getDate() + 30);

			data.from_date = startDate;
			data.to_date = endDate
			data.userid = this.props.UserId;
			this.props.getStaffJobDetails(data);

		}else{
			data.from_date = new Date();
			data.to_date = this.state.to_date;
			data.userid = this.props.UserId;
			this.props.getStaffJobDetails(data);
		}
		
	}

	componentDidMount(){

		
		this.loadJobs();
	}

	onSelectChange = (selectedRowKeys, selectedRows)  => {
				    if(selectedRows.length != 0){
				    	this.setState({ selectedRowKeys : selectedRowKeys,
				    					selectedRows:selectedRows,
				    					rowsSelected :false});
				    }else{
				    	this.setState({selectedRows,selectedRowKeys,rowsSelected :true});
				    }
	}
	OnDeleteJobs= ()=>{
	
		var jobs = [];
		if(this.state.selectedRows.length > 0) {
			jobs = this.state.selectedRows.map((row)=>{
				return row.jobid;
			})
			console.log(jobs)
			let data ={};
			data.jobs = jobs;
			data.userid = this.props.UserId;
			this.props.deleteStaffJobs(data);
			var data = {};
			data.from_date = this.state.from_date;
			data.to_date = this.state.to_date;
			data.userid = this.props.UserId;
			this.loadJobs(data);
			this.setState({
				rowsSelected : true,
			})
		}else{
				error("Please select jobs to delete");
			}
	}

render(){

	let startDate =  new Date().toJSON().slice(0,10);
			let endDate = new Date();
			endDate.setDate(endDate.getDate() + 30);
			const dateFormat = 'YYYY/MM/DD';
 const rowSelection = {

				  onChange: this.onSelectChange
				 
				};


	return(
		<div>
			
			<Row>
				<Col>
				</Col>
				<Col>
					<Row>
						 <Col xs={0} sm={2} md={2} lg={2} xl={2}> 
      					 </Col>
						<Col xs={24} sm={20} md={20} lg={20} xl={20}> 
							<div style={{margin:"5px"}}>
					       		<RangePicker onChange={ this.OnChangeDate } defaultValue={[moment( startDate, dateFormat), moment(endDate, dateFormat)]}/>
			        			<Button 
						            type="primary"
						            style={{margin:"5px"}}
						            onClick = {this.loadJobs}
						            rowSelection={rowSelection}
						        >
						        Load
						        </Button>
						        <Button 
						            type="primary"
						            style={{margin:"5px"}}
						            onClick = {this.OnDeleteJobs}
						        >
						        Decline Job
						        </Button>
			        	     </div>
			     			<div>
           						 <Table 
           						 rowSelection={rowSelection}
           						 scroll={{ x: 800 }}
           						 pagination= { {pageSizeOptions: ['5','10'], showSizeChanger: true}}
								 size="small"
							     dataSource={this.props.staffScheduledJobs}
           						 size="medium" 
           						 >
	           						 <Column 
										title="JobID"
										dataIndex="jobid"
										key="jobid"
								        fixed ='left' />

								       <Column 
											title="Hospital"
											dataIndex="client"
										 />

								       <Column 
											title="Date"
											dataIndex="date"
										/>


										<Column 
											title="Start Time"
											dataIndex="start_time"
										/>

										<Column 
											title="End Time"
											dataIndex="end_time"
										/>

								
								</Table>
					
					   			
          					</div>
						</Col>
       					<Col xs={0} sm={2} md={2} lg={2} xl={2}> 
						</Col>
					</Row>	
					</Col>
					<Col>
					</Col>
				</Row>
			</div>

		)


	}

}

export default connect (mapStateToProps,mapDispatchToProps) (StaffJobDetails);