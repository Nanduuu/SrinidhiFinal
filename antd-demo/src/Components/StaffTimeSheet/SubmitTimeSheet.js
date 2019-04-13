import React from 'react';
import { Table, Divider, Tag ,DatePicker, Button } from 'antd';
import { Row, Col } from 'antd';
import moment from 'moment';
import { Modal } from 'antd';
import {Input} from 'antd';
import { getFactTableData } from './Actions';
import {connect} from 'react-redux';
import axios from 'axios';

const { TextArea } = Input;


const { MonthPicker, RangePicker } = DatePicker;
const { Column, ColumnGroup } = Table;

const mapDispatchToProps = (dispatch)=>{
	return{
		getFactTableData : (data)=>{
			dispatch(getFactTableData(data))

		},
	}
}

const mapStateToProps = (state)=>{
	return {
		userid : state.Reducer.user.UserId,
		factTableData : state.StaffDashboard.factTableData,
	}
}


class SubmitTimeSheet extends React.Component{

	constructor(props){
		super(props);
		this.state = { 
			visible: false,
			startDate: null,
			endDate:null,
			curr_record:null,
			remarks:'',
		 }

	}

 showModal = (record) => {
    this.setState({
      visible: true,
      curr_record : record,
    });
  }

  handleOk = (e) => {
    console.log();

    var data = {};
    var record = this.state.curr_record;

    const data = new FormData();

    data.append('jobid', record.jobid);
    data.append('userid', record.userid);
    data.append('remarks', this.state.remarks);
    data.append('ack',this.state.file);


    

    axios.post('/api/submitTimeSheet/',data).then(function(res){

    }).catch(function(err){

    })


    this.setState({
      visible: false,
      curr_record:null,
      remarks:'',
    });
  }

  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
      curr_record:null,
      file:null,
      remarks:'',
    });
  }

  componentDidMount(){

  	let endDate =  new Date().toISOString();
    let startDate = new Date();
	startDate.setDate(startDate.getDate() - 30);

	let data = {
		endDate,
		startDate : startDate.toISOString(),
		userid : this.props.userid,
	}

	console.log(data)
  	this.props.getFactTableData(data);


  }

  onLoad = ()=>{
  		let startDate =  this.state.startDate;
   		 let endDate = this.state.endDate;
	

	let data = {
		startDate,
		endDate,
		userid : this.props.userid,
	}

	console.log(data)
  	this.props.getFactTableData(data);



  }

  OnChangeDate = (value,dateString)=>{
		console.log(dateString);
		this.setState({
		startDate : dateString[0],
		endDate : dateString[1],
	
		})

	}

	fileOnchange=(event)=>{
		console.log(event.target.files[0])
		this.setState({file : event.target.files[0]})
	}

	remarksOnchange=(event)=>{
		this.setState({remarks:event.target.value})
	}

render(){

	let startDate =  new Date().toJSON().slice(0,10);
			let endDate = new Date();
			endDate.setDate(endDate.getDate() + 30);
			const dateFormat = 'YYYY/MM/DD';

	const columns = [{
				  title: 'Job ID',
				  dataIndex: 'jobid',
				  key: 'jobid',
				  width:150,

				},{
				  title: 'Hospital',
				  dataIndex: 'client',
				  key: 'Jobid',
				  width:150,
				  
				},{title: 'Date',
				  dataIndex: 'date',
				  key: 'Date',
				  width:150,
				   
				},{
				  title: 'Start Time',
				  dataIndex: 'start_time',
				  key: 'jobid',
				  width:150,
				   
				}, {
				  title: 'End Time',
				  dataIndex: 'end_time',
				  key: 'jobid',
				  width:150,
				  
				},{
				  title: 'Action',
				  dataIndex: 'Action',
				  key: 'jobid',
				  width:150,
				  
				  render: (text, record) => (
				    <span>
				       <Button type="primary" onClick={()=>{this.showModal(record)}} disabled = { record.flag == 'Y' ? true : false} >
				         { record.flag == 'Y' ? 'Approved' : 'Submit Time Sheet'} 
				        </Button>
				    </span>
				  ),
				}];

	return(
		<div>
			<Modal
		          title="Proof Submission"
		          visible={this.state.visible}
		          onOk={this.handleOk}
		          onCancel={this.handleCancel}
		        >
		          <Input type="file" name={'ack'} onChange = {this.fileOnchange}/>
		          <lable > Remarks (Characters should be less than 200) </lable>
		          <TextArea onChange = {this.remarksOnchange} value = {this.state.remarks} />
		          <lable> Characters Count : {this.state.remarks.length} </lable>
		        </Modal>
			<Row>
				<Col>
				</Col>
				<Col>
					<Row>
						 <Col xs={0} sm={0} md={2} lg={2} xl={2}> 
      					 </Col>
						<Col xs={24} sm={24} md={20} lg={20} xl={20}> 
							<div style={{margin:"5px"}}>
					       		<RangePicker defaultValue={[moment( startDate, dateFormat), moment(endDate, dateFormat)]}
					       		onChange = {this.OnChangeDate}/>
			        			<Button 
			            			type="primary"
			            			style={{margin:"5px"}}
			            			onClick = {this.onLoad}
			        			>
			        			Load
			        			</Button>
			        	     </div>
			     			<div>
           						 <Table columns={columns} 
           						 		size="medium" 
           						 		scroll = {{x:1000}}
           						 		dataSource={this.props.factTableData} />
					   			
          					</div>
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

export default connect ( mapStateToProps ,mapDispatchToProps ) (SubmitTimeSheet);