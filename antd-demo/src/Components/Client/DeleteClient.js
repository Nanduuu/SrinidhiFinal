import React from 'react';
import {Row, Col} from 'antd';
import { Select,Input,Button } from 'antd';
import {connect} from 'react-redux';
import {activegetClients,inactivegetClients,deleteClients,disableClient,enableClient} from './Actions';
import {resetEnableClient, resetDisableClient} from './Actions';
import {Redirect} from 'react-router-dom';
import { message } from 'antd';
const Option = Select.Option;

const success = (text) => {
  message.success(text);
};
const error = (text)=>{
	message.error(text)
}

const LabelStyle = {

	textAlign:"center",
	paddingTop:"5px"
}

const submitStyle = {
	width:"90%"
}



const mapDispatchToProps = (dispatch)=>{
	return{
		activegetClients : ( )=>{
			dispatch(activegetClients());
		},
		inactivegetClients : ( )=>{
			dispatch(inactivegetClients());
		},
		disableClient : (data)=>{
			dispatch(disableClient(data));
		},
		enableClient : (data)=>{
			dispatch(enableClient(data));
		},
		resetDisableClient : ()=>{
			dispatch(resetDisableClient());
		},
		resetEnableClient : ()=>{
			dispatch(resetDisableClient());
		}
		
	}

}
const mapStateToProps = (state)=>{
	return {
		role : state.Reducer.user.Role,
		activeClients:state.ClientDetails.activeClients,
		inactiveClients:state.ClientDetails.inactiveClients,
		disableMsg : state.ClientDetails.disableClientMsg,
		disableFlag : state.ClientDetails.disableClientFlag,
		enableMsg : state.ClientDetails.enableClientMsg,
		enableFlag : state.ClientDetails.enableClientFlag,
	}
}

class DeleteClient extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			disableSelectedClient : "",
			enableSelectedClient : "",
		}
		this.loadAtiveClients = this.loadActiveClients.bind(this);
		this.disableOnSelect = this.disableOnSelect.bind(this);
		this.enableOnSelect = this.enableOnSelect.bind(this);
		this.disable = this.disable.bind(this);
		this.enable = this.enable.bind(this);
		this.isvalidated = this.isvalidated.bind(this);
	}

	
componentDidMount(){
	
	this.props.activegetClients();
	this.props.inactivegetClients();
}

disableOnSelect = (value)=>{

	this.setState({
		disableSelectedClient : value,
	})
}
enableOnSelect = (value)=>{
	this.setState({
			enableSelectedClient : value,
		})
}


isvalidated = ()=>{
		if (this.props.role !== 'staff'){
			return true;
		}
	}

disable = ()=>{

	this.props.resetDisableClient();
	if (this.state.disableSelectedClient ){
		this.props.disableClient(this.state.disableSelectedClient);
	}else{
		error("Please select client")
	}

}
enable = ()=>{


	if (this.state.enableSelectedClient ){
		this.props.enableClient(this.state.enableSelectedClient);

	}else{
		error("Please select client")
	}

}

componentWillReceiveProps = (nextProps)=>{
	
  if(nextProps.disableMsg != "" ){
   		if(nextProps.disableFlag == true){
   			success(nextProps.disableMsg);
   			this.reset();
   			
   		}
   		if(nextProps.disableFlag == false){
   			error(nextProps.disableMsg);
   			this.reset();
   		}
  }
  if(nextProps.enableMsg != "" ){
   		if(nextProps.enableFlag == true){
   			success(nextProps.enableMsg);
   			this.reset();
   			
   		}
   		if(nextProps.enableFlag == false){
   			error(nextProps.enableMsg);
   			this.reset();
   		}
  }
}

reset = ()=>{
	this.setState({
		enableSelectedClient : "",
		disableSelectedClient : "",
	})
	this.props.resetDisableClient();
	this.props.resetEnableClient();
   	this.props.activegetClients();
   	this.props.inactivegetClients();


}

loadActiveClients = (clients)=>{
     const listItems = clients.map((number) =>
						  <Option key = {number} value={number}>{number}</Option>
						);
		return listItems;
	}




render(){
	return(
				<div>
					{this.isvalidated() ? null : <Redirect to ='/PageNotFound'/>}
					<Row style={{padding:"5px"}}>
						<Col xs={2} sm={2} md={4} lg={5} >
						</Col>
						<Col xs={20} sm={20} md={16} lg={14}>
							<form onSubmit = {this.OnSubmit}>
								<Row style={{padding:"5px"}}>
									<Col xs={8} sm={8} md={8} lg={8} style={LabelStyle}>
										<lable> Select cleint to disable  </lable>
									</Col>
									<Col xs={8} sm={8} md={8} lg={8}>
										<Select 
											onSelect = {this.disableOnSelect}
											value = {this.state.disableSelectedClient}
											style={{ width: '90%' }}>
											{this.loadActiveClients(this.props.activeClients)}
											
										</Select>
									</Col>
									<Col xs={8} sm={8} md={8} lg={8}>
										<Button type="primary" onClick = {this.disable} style={submitStyle}> Disable </Button>
									</Col>
								</Row>


								<Row style={{padding:"5px"}}>
									<Col xs={8} sm={8} md={8} lg={8} style={LabelStyle}>
										<lable> Select cleint to enable  </lable>
									</Col>
									<Col xs={8} sm={8} md={8} lg={8}>
										<Select 
											onSelect = {this.enableOnSelect}
											value = {this.state.enableSelectedClient}
											style={{ width: '90%' }}>
											{this.loadActiveClients(this.props.inactiveClients)}

										</Select>
									</Col>
									<Col xs={8} sm={8} md={8} lg={8}>
										<Button type="primary" onClick={this.enable} style={submitStyle}> Enable</Button>
									</Col>
								</Row>
								
							</form>
						</Col>
						<Col xs={2} sm={2} md={4} lg={5} >
					</Col>
					</Row>
				</div>
		)
	}
}
export default connect (mapStateToProps,mapDispatchToProps) (DeleteClient);
