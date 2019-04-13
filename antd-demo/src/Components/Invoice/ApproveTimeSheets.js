import React from 'react';
import { Table, Divider, Tag ,DatePicker, Button } from 'antd';
import { Row, Col ,message} from 'antd';
import moment from 'moment';
import { Modal } from 'antd';
import {Input} from 'antd';
import { getFactTableData ,approveTimeSheets} from './Actions';
import {connect} from 'react-redux';
import Lightbox from 'react-images';
import Logo from './../../Images/logo.png';

const { TextArea } = Input;

const error =(data)=>{
	message.error(data);
}

const { MonthPicker, RangePicker } = DatePicker;
const { Column, ColumnGroup } = Table;

const mapDispatchToProps = (dispatch)=>{
	return{
		getFactTableData : (data)=>{
			dispatch(getFactTableData(data))

		},
		approveTimeSheets : (data)=>{
			dispatch(approveTimeSheets(data))
		},
	}
}

const mapStateToProps = (state)=>{
	return {
		userid : state.Reducer.user.UserId,
		factTableData : state.StaffDashboard.factTableData,
	}
}


class ApproveTimeSheets extends React.Component{

	constructor(props){
		super(props);
		this.state = { 
			visible: 'true',
			startDate: null,
			endDate:null,
			ack_path:null,
			lightboxIsOpen:false,
			
		 }

	}

	showModal = () => {
    	this.setState({
      		visible: true,
    	});
  	}

  handleOk = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }

  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }

  componentDidMount(){

  	let startDate =  new Date();
    let endDate = new Date();
	startDate.setDate(startDate.getDate() - 6);

	this.setState({
		startDate:startDate.toISOString().slice(0,10),
		endDate:endDate.toISOString().slice(0,10),
	})


  		let data = {
			startDate : startDate,
			endDate : endDate,
			
		}
	
	
  			this.props.getFactTableData(data);
	
  }
  componentWillReceiveProps(nextProps){

    if(nextProps.factTableData != this.props.factTableData){
    	let startDate =  new Date();
        let endDate = new Date();
		startDate.setDate(startDate.getDate() - 6);

	  		let data = {
			startDate : startDate,
			endDate : endDate,
			
		}
	
	
  			this.props.getFactTableData(data);
    }
 }


  approve = (record)=>{
  		
  		var data = {};
  		data.jobid = record.jobid;
  		data.userid = record.userid;
  		data.flag = record.flag;

  		this.props.approveTimeSheets(data)

  }

  loadJobs = ()=>{

  		let data = {
			startDate : this.state.startDate,
			endDate : this.state.endDate,
		}

  			this.props.getFactTableData(data);
  }

  OnChangeDate = (value,dateString)=>{
		console.log(dateString);
		this.setState({
			startDate : dateString[0],
			endDate : dateString[1],
	
		})

	}


render(){

			let startDate =  new Date();
			let endDate = new Date();
			startDate.setDate(startDate.getDate() - 6);
			const dateFormat = 'YYYY/MM/DD';

	const columns = [{
				  title: 'Job ID',
				  dataIndex: 'jobid',
				 width:150,
				},{
				  title: 'Hospital',
				  dataIndex: 'client',
				  width:150,
				  
				},{
				  title: 'Name',
				  dataIndex: 'Fname',
				  width:150,
				  
				},{
				  title: 'Staff',
				  dataIndex: 'stafftype',
				 	width:150,
				  
				},{title: 'Date',
				  dataIndex: 'date',
				 width:250,
				
				},{
				  title: 'Start Time',
				  dataIndex: 'start_time',
				  width:250,
		  
				}, {
				  title: 'End Time',
				  dataIndex: 'end_time',
				  width:250,
				  
				},
				{
				  title: 'Remarks',
				  dataIndex: 'remarks',
				  width:250,			  
				},
				 {
				  title: 'ACK',
				  dataIndex: 'ack_path',
			
				  width:100,
				  render: (text, record) => {
				  	//console.log(record)

				  	return (
				    <span>
				       <Button type="primary" onClick={()=>{this.setState({lightboxIsOpen:true,
				       														     ack_path:record.ack_path})}} >
				          View ACK
				        </Button>
				    </span>

				  )},
				  
				},{
				  title: 'Action',
				  dataIndex: 'Action',
				  key: 'Action',
				  fixed:"right",
				  width:100,
				  render: (text, record) => (
				    <span>
				       <Button type= {record.flag == 'Y' ? 'danger' : 'primary'}
				       		 onClick={()=>{this.approve(record)}} >
				          {record.flag == 'Y' ? 'Reject' : 'Approve'}
				        </Button>
				    </span>

				  ),
				  
				  
				}];

	return(
		<div>
			<Row>
				<Col xs={24} sm={24} md={20} lg={20} xl={20}>
				  <Lightbox
						  images={[
						    { src:this.state.ack_path}
						   
						  ]}
						  isOpen={this.state.lightboxIsOpen}
						   onClose={()=>{this.setState({lightboxIsOpen:false})}}
						/>
				</Col>
			</Row>
			<Row>
				<Col>
				</Col>
				<Col>
					<Row>
						 <Col xs={0} sm={0} md={2} lg={2} xl={2}> 

      					 </Col>
						<Col xs={24} sm={24} md={20} lg={20} xl={20}> 
							<Row>
								
								<Col xs={12} sm={12} md={6} lg={6} xl={6}>
									<RangePicker defaultValue={[moment( startDate, dateFormat), moment(endDate, dateFormat)]} onChange = {this.OnChangeDate}/>

								</Col>
								<Col xs={12} sm={12} md={6} lg={6} xl={6}>
				        			<Button type="primary" onClick={this.loadJobs}> Load </Button>

								</Col>
							</Row>
														
			     			<Row>
			     				<Col xs={24} sm={24} md={24} lg={24} xl={24} >
           						 	<Table columns={columns} 
           						 			size="medium" 
           						 			scroll={{ x: 1800 }}
           						 			dataSource={this.props.factTableData} />
					   			</Col>
          					</Row>
						</Col>
       					<Col xs={0} sm={0} md={2} lg={2} xl={2}> 
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

export default connect ( mapStateToProps ,mapDispatchToProps ) (ApproveTimeSheets);


