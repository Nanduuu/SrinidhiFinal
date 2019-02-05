import React from 'react';
import {Row, Col } from 'antd';
import { Select,Input,Button ,message} from 'antd';
import {connect} from 'react-redux';
import {getClients,deleteClients} from '../Redux/Actions';
import {Redirect} from 'react-router-dom';

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
										<label >Selct Client </label>
									</Col>
									<Col xs={12} sm={12} md={12} lg={12}>
										<Input style={InputStyle} onChange={this.Onchange} required />
								           
									</Col>
								</Row>
								<Row>
									<Col xs={12} sm={12} md={12} lg={12} style={LabelStyle}>
										<label>Select Branch</label>
									</Col>
									<Col xs={12} sm={12} md={12} lg={12}>
										<Input style={InputStyle} onChange={this.Onchange} required />
									</Col>

								</Row>
								
								<Row>
									<Col xs={12} sm={12} md={12} lg={12} style={LabelStyle}>
										<label style={LabelStyle}>Address</label>
									</Col>
									<Col xs={12} sm={12} md={12} lg={12}>
										<TextArea style={InputStyle} onChange={this.Onchange} required / >

									</Col>
								</Row>
								
								<Row>
									<Col xs={12} sm={12} md={12} lg={12} style={LabelStyle}>
										<label>Pin Code</label>
									</Col>
									<Col xs={12} sm={12} md={12} lg={12}>
										<Input placeholder="Please enter AlphaNumeric Pincode"  pattern="^[0-9, ,a-z,A-Z]{1,8}$" style={InputStyle} onChange={this.Onchange} required/>
									</Col>

								</Row>
								<Row style={{paddingTop:"10px"}}>
									<Col xs={12} sm={12} md={12} lg={12}>
										<Input type="submit" disabled = {this.props.statusInd} style={submitStyle} value = "SAVE"/>
									</Col>
									<Col xs={12} sm={12} md={12} lg={12}>
										<Button type="danger " style={submitStyle} disabled={this.props.statusInd} onClick={this.reset}>Reset</Button>
									</Col>
								</Row>
							</Col>
							<Col>

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