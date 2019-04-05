import React from 'react';
import { Table, Divider, Tag ,DatePicker, Button } from 'antd';
import {Row, Col } from 'antd';
import {connect} from 'react-redux';
import {getStaffJobDetails} from './Actions';
import moment from 'moment';


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
		
	}

}

class StaffJobDetails extends React.Component{

	constructor(props){
		super(props);
		this.state = {
			
			from_date : null,
			to_date : null,
			
			
		}
	}

	OnChangeDate = (value,dateString)=>{
		console.log(dateString);
		this.setState({
			from_date : dateString[0],
			to_date : dateString[1],
		})

	}
	
	loadJobs = ()=>{
		var data = {};
		data.from_date = this.state.from_date;
		data.to_date = this.state.to_date;
		data.userid = this.props.UserId;
		this.props.getStaffJobDetails(data);
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
						 <Col xs={0} sm={2} md={4} lg={5} xl={5}> 
      					 </Col>
						<Col xs={24} sm={20} md={16} lg={14} xl={14}> 
							<div style={{margin:"5px"}}>
					       		<RangePicker onChange={ this.OnChangeDate } defaultValue={[moment( startDate, dateFormat), moment(endDate, dateFormat)]}/>
			        			<Button 
						            type="primary"
						            style={{margin:"5px"}}
						            onClick = {this.loadJobs}
						        >
						        Load
						        </Button>
						        <Button 
						            type="primary"
						            style={{margin:"5px"}}
						            onClick = {null}
						        >
						        Decline Job
						        </Button>
			        	     </div>
			     			<div>
           						 <Table 
           						 rowSelection={rowSelection}
           						 scroll={{ x: 800 }}
           						 pagination= { {pageSizeOptions: ['5','10','15','20','50','100'], showSizeChanger: true}}
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
											key="client" />

								       <Column 
											title="Date"
											dataIndex="date"
											key="date" />


										<Column 
											title="Start Time"
											dataIndex="start_time"
											key="date" />

										<Column 
											title="End Time"
											dataIndex="end_time"
											key="date" />

								
								</Table>
					   			
          					</div>
						</Col>
       					<Col xs={0} sm={2} md={4} lg={5} xl={5}> 
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