import React from 'react';
import {Row, Col } from 'antd';
import { Select,Input,Button ,message} from 'antd';
import {connect} from 'react-redux';
import {getClients,deleteClients} from '../Redux/Actions';
import {Redirect} from 'react-router-dom';
import {Table} from "antd";
const { Column, ColumnGroup } = Table;


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

export default class EditClient extends React.Component{

constructor(props){
		super(props);
		
	}

render(){
	return(
		<div>
			<Row style={{padding:'5px'}}>
					<Col xs={2} sm={2} md={4} lg={5} >
					</Col>
					<Col xs={20} sm={20} md={16} lg={14}>
						<Row>
							<Col>
								<Row>
									<Col xs={12} sm={12} md={12} lg={12} style={LabelStyle} >
										<label >Select Client </label>
									</Col>
									<Col xs={12} sm={12} md={12} lg={12}>
										<Select  onChange={this.handleChangeStaff}  style={InputStyle} required>
								           
								        </Select>
									</Col>
								</Row>
								<Row>
									<Table
										pagination= { {pageSizeOptions: ['5','10','15','20','50','100'], showSizeChanger: true}}
										size="small"
										dataSource={this.props.jobDetails}
										>
									
										<Column 
											title="START TIME"
											dataIndex="START_TIME"
											key="START_TIME" />

									     <Column 
											title="END TIME"
											dataIndex="END_TIME"
											key="END_TIME" />

										<Column 
											title="SHIFT TYPE"
											dataIndex="SHIFT_TYPE"
											key="SHIFT_TYPE" />
										<Column
											title="ACTION"
										    dataIndex="ACTION"
											key="ACTION" />
										
									</Table>
								</Row>
								
								
							</Col>
							
						</Row>
					</Col>
					<Col xs={2} sm={2} md={4} lg={5} >
					</Col>
				</Row>


		</div>
		)
}

}