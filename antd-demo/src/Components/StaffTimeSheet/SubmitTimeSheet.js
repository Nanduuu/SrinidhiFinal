import React from 'react';
import { Table, Divider, Tag ,DatePicker, Button } from 'antd';
import {Row, Col } from 'antd';
import moment from 'moment';
import { Modal } from 'antd';
import {Input} from 'antd';
const { TextArea } = Input;


const { MonthPicker, RangePicker } = DatePicker;
const { Column, ColumnGroup } = Table;


const dataSource = [{
  key: '1',
  JobId:"ABC001",
  Hospital: 'Narayana',
  Date:"01/01/2019",
  Time: "10 to 12",
  
},{
  key: '2',
  JobId:"ABC002",
  Hospital: 'Forties',
  Date:"02/01/2019",
  Time: "6 to 12",
  
},];


class SubmitTimeSheet extends React.Component{

	constructor(props){
		super(props);
		this.state = { visible: false }

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

render(){

	let startDate =  new Date().toJSON().slice(0,10);
			let endDate = new Date();
			endDate.setDate(endDate.getDate() + 30);
			const dateFormat = 'YYYY/MM/DD';

	const columns = [{
				  title: 'JobId',
				  dataIndex: 'JobId',
				  key: 'JobId',

				},{
				  title: 'Hospital',
				  dataIndex: 'Hospital',
				  key: 'Hospital',
				},{title: 'Date',
				  dataIndex: 'Date',
				  key: 'Date',
				},{
				  title: 'Time',
				  dataIndex: 'Time',
				  key: 'Time',
				}, {
				  title: 'Action',
				  dataIndex: 'Action',
				  key: 'Action',
				  render: (text, record) => (
				    <span>
				       <Button type="primary" onClick={this.showModal}>
				          Submit Time Sheet
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
		          <Input type="file"/>
		          <lable> Remarks </lable>
		          <TextArea/>
		        </Modal>
			<Row>
				<Col>
				</Col>
				<Col>
					<Row>
						 <Col xs={0} sm={2} md={4} lg={5} xl={5}> 
      					 </Col>
						<Col xs={24} sm={20} md={16} lg={14} xl={14}> 
							<div style={{margin:"5px"}}>
					       		<RangePicker defaultValue={[moment( startDate, dateFormat), moment(endDate, dateFormat)]}/>
			        			<Button 
			            			type="primary"
			            			style={{margin:"5px"}}
			        			>
			        			Load
			        			</Button>
			        	     </div>
			     			<div>
           						 <Table columns={columns} size="medium" dataSource={dataSource} />
					   			
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

export default SubmitTimeSheet;