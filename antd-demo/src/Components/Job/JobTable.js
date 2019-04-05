import React from 'react';
import { Table, Divider, Tag ,Popconfirm} from 'antd';
import {Row, DatePicker,Col ,Button,message} from 'antd';
import moment from 'moment';
import {getJobDetails,deleteJobs} from './Actions';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

const { MonthPicker, RangePicker } = DatePicker;
const { Column, ColumnGroup } = Table;

const error = (text)=>{
	message.error(text);
}

const mapDispatchToProps = (dispatch)=>{
	return{
		getJobDetails :(data)=>{
			dispatch(getJobDetails(data))
		},
		deleteJobs : (data)=>{
			dispatch(deleteJobs(data))
		},
	}

}
const mapStateToProps = (state)=>{
	return{
		role : state.Reducer.user.Role,
		jobDetails : state.Reducer.jobDetails,
	}
}

     
class JobTable extends React.Component{

	constructor(props){
		super(props)
		this.state = {
			rowsSelected : true,
			selectedRows:[],
			selectedRowKeys: [],
			from_date : null,
			to_date : null,
			loadingFlag : false,
			
		}
		this.OnChangeDate = this.OnChangeDate.bind(this);
		this.loadJobs = this.loadJobs.bind(this);
		this.onSelectChange = this.onSelectChange.bind(this);
		this.isvalidated = this.isvalidated.bind(this);
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
		this.props.getJobDetails(data);
	}

	OnDeleteJobs= ()=>{
	
		var jobs = [];
		if(this.state.selectedRows.length > 0) {
		jobs = this.state.selectedRows.map((row)=>{
			return row.JobID;
		})
		this.props.deleteJobs(jobs);
		var data = {};
		data.from_date = this.state.from_date;
		data.to_date = this.state.to_date;
		this.loadJobs(data);
		this.setState({
			rowsSelected : true,
		})
		}else{
			error("Please select jobs to delete");
		}
	}

	isvalidated = ()=>{
		if (this.props.role !== 'staff'){
			return true;
		}
	}


	componentDidMount (){

		var startDate =  new Date();
		var endDate = new Date();
		endDate.setDate(endDate.getDate() + 30);

		var data = {};
		data.from_date = startDate;
		data.to_date = endDate;

		this.setState({
			from_date : startDate,
			to_date : endDate,
		})

		this.props.getJobDetails(data);

	}
	

	render(){
			const rowSelection = {

				  onChange: this.onSelectChange
				 
				};
			const dateFormat = 'YYYY/MM/DD';
			var startDate =  new Date().toJSON().slice(0,10);
			var endDate = new Date();
			endDate.setDate(endDate.getDate() + 30);
			
		return(
			<div>
				{this.isvalidated() ? null : <Redirect to ='/PageNotFound'/>}
				<Row>
					<Col>
					<div style={{margin:"5px"}}>
			        <RangePicker onChange={ this.OnChangeDate } defaultValue={[moment( startDate, dateFormat), moment(endDate, dateFormat)]}/>
			        <Button 
			            type="primary"
			            style={{margin:"5px"}}
			            onClick = {this.loadJobs}
			        >
			        Load
			        </Button>
			        <Popconfirm  style={{margin:"5px"}} okType="primary" title="Are you sure delete jobs ?" onConfirm={this.OnDeleteJobs } disabled = {this.state.disabled} onCancel={null} okText="Yes" cancelText="No" >
			        
			        	<Button>Delete</Button>
			        
			        </Popconfirm>
			      </div>
			      </Col>
			      </Row>
			      <Row>
			      	<Col xs= {1} sm={1} md={1} lg={1}>
			      	</Col>
			      	<Col xs= {22} sm={22} md={22} lg={22}>
			      	
							<Table 
							rowSelection={rowSelection}
							pagination= { {pageSizeOptions: ['5','10','15','20','50','100'], showSizeChanger: true}}
							size="small"
							dataSource={this.props.jobDetails}
							columnWidth = "500"
							scroll={{ x: 1200 }}>

							<Column 
								title="JobID"
								dataIndex="JobID"
								key="JobID"
						        fixed ='left' />

						     <Column 
								title="Client"
								dataIndex="Client"
								key="Client" />

							<Column 
								title="Date"
								dataIndex="Date"
								key="Date" />
							<Column
								title="Staff"
							    dataIndex="Staff"
								key="Staff" />
							<Column
								title="Start Time"
							    dataIndex="start_time"

								key="start_time" />
							<Column
								title="End Time"
							    dataIndex="end_time"
								key="to_time" />
							<Column
								title="Requested"
								 dataIndex="Requested"
								 key="Requested"/>
							<Column
								title="Filled"
								dataIndex="Filled"
								key="Filled" />
				
					</Table>
   
			      	</Col>
			      	<Col xs= {1} sm={1} md={1} lg={1}>
			      	</Col>
					</Row>
				

			</div>



			)
	}

}

export default connect (mapStateToProps,mapDispatchToProps) (JobTable);