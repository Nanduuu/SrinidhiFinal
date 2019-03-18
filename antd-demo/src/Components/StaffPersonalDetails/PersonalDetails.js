import React from 'react';
import { Button } from 'antd';
import {Row, Col } from 'antd';
import {Input,Select} from 'antd';
const Option = Select.Option;


const children = [];
for (let i = 10; i < 36; i++) {
  children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
}

class PersonalDetails extends React.Component{

	constructor(props){
		super(props);
	}

render(){

	return(

			<div style={{margin:"5px"}}>
					 <Col xs={0} sm={2} md={4} lg={5} xl={5}> 
      				 </Col>
					 <Col xs={24} sm={20} md={16} lg={14} xl={14}> 
				
					 		<Row>
					 			<Col xs={10} sm={10} md={10} lg={10} xl={10}>
					 				<lable>Email Id</lable>
					 			</Col>
					 			<Col xs={10} sm={10} md={10} lg={10} xl={10}>
					 				<Input />
					 			</Col>
					 			<Col xs={4} sm={4} md={4} lg={4} xl={4}>
					 				
					 			</Col>
					 		</Row>
					 		<Row>
					 			<Col xs={10} sm={10} md={10} lg={10} xl={10}>
					 				<lable>First Name</lable>
					 			</Col>
					 			<Col xs={10} sm={10} md={10} lg={10} xl={10}>
					 				<Input disabled  />
					 			</Col>
					 			<Col xs={4} sm={4} md={4} lg={4} xl={4}>
					 				<a>Edit</a>
					 			</Col>
					 		</Row>
					 		<Row>
					 			<Col xs={10} sm={10} md={10} lg={10} xl={10}>
					 				<lable>Last Name</lable>
					 			</Col>
					 			<Col xs={10} sm={10} md={10} lg={10} xl={10}>
					 				<Input disabled/>
					 			</Col>
					 			<Col xs={4} sm={4} md={4} lg={4} xl={4}>
					 				<a>Edit</a>
					 			</Col>
					 		</Row>
					 		<Row>
					 			<Col xs={10} sm={10} md={10} lg={10} xl={10}>
					 				<lable>Tele Phone</lable>
					 			</Col>
					 			<Col xs={10} sm={10} md={10} lg={10} xl={10}>
					 				<Input disabled/>
					 			</Col>
					 			<Col xs={4} sm={4} md={4} lg={4} xl={4}>
					 				<a>Edit</a>
					 			</Col>
					 		</Row>
					 		<Row>
					 			<Col xs={10} sm={10} md={10} lg={10} xl={10}>
					 				<lable>Prefered Location</lable>
					 			</Col>
					 			<Col xs={10} sm={10} md={10} lg={10} xl={10}>
					 				<Select 
											mode="tags"
											style={{ width: '100%' }}>
											{ children}
										</Select>
					 			</Col>
					 			<Col xs={4} sm={4} md={4} lg={4} xl={4}>
					 				<a>Edit</a>
					 			</Col>
					 		</Row>
					 		<Row>
					 			<Col xs={10} sm={10} md={10} lg={10} xl={10}>
					 			</Col>
					 			<Col xs={10} sm={10} md={10} lg={10} xl={10}>
					 				<Button type="primary"> Save </Button>
					 				<Button> Cancel </Button>
					 			</Col>
					 			<Col xs={4} sm={4} md={4} lg={4} xl={4}>
					 			</Col>
					 		</Row>
					 </Col>
					 <Col xs={0} sm={2} md={4} lg={5} xl={5}> 
      				 </Col>


			</div>
		)
	}
}

export default PersonalDetails;