import React from 'react';
import {Row, Col} from 'antd';
import { Select,Input,Button ,message} from 'antd';
import {connect} from 'react-redux';
import {getClients,deleteClients} from '../Redux/Actions';
import {Redirect} from 'react-router-dom';
const Option = Select.Option;

const LabelStyle = {

	textAlign:"center",
	paddingTop:"5px"
}

const submitStyle = {
	width:"90%"
}

const success = (text)=>{
	message.success(text);
}

const mapDispatchToProps = (dispatch)=>{
	return{
		getClients : ( )=>{
			dispatch(getClients());
		},
		deleteClients : (data)=>{
			dispatch(deleteClients(data));
		}
	}

}
const mapStateToProps = (state)=>{
	return {
		role : state.user.Role,
		clients:state.clients,
		
	}
}

class DeleteClient extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			selectedClients :[],
			
		}
		this.loadClients = this.loadClients.bind(this);
		this.OnSelect = this.OnSelect.bind(this);
		this.OnDeselect = this.OnDeselect.bind(this);
		this.isvalidated = this.isvalidated.bind(this);
	}

	componentWillReceiveProps = (nextProps)=>{
		debugger;
		if (nextProps.clients.length != this.props.clients.length){
			this.loadClients(nextProps.clients);
			success("Clients are deleted successfully");
		} 
	}

componentDidMount(){
	this.props.getClients();
	console.log(this.state.clients);
}

OnSelect = (value)=>{
	//alert(value)
	var selectedClients = this.state.selectedClients;
	selectedClients.push(value);
	
	this.setState({
		selectedClients : selectedClients
	})
	console.log(this.state);
}

OnDeselect = (value)=>{
	var selectedClients = this.state.selectedClients;
	selectedClients.pop(value);
	this.setState({
		selectedClients : selectedClients
	})
	console.log(this.state);

}

isvalidated = ()=>{
		if (this.props.role !== 'staff'){
			return true;
		}
	}

loadClients = (clients)=>{
     const listItems = clients.map((number) =>
						  <Option key = {number} value={number}>{number}</Option>
						);
		return listItems;
	}

OnSubmit = (e)=>{
	e.preventDefault();
	this.props.deleteClients(this.state.selectedClients);
	this.props.getClients();
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
										<lable> Select cleints to disable  </lable>
									</Col>
									<Col xs={8} sm={8} md={8} lg={8}>
										<Select 
											mode="tags"
											onSelect = {this.OnSelect}
											onDeselect = {this.OnDeselect}
											style={{ width: '90%' }}>
											{this.loadClients(this.props.clients)}
										</Select>
									</Col>
									<Col xs={8} sm={8} md={8} lg={8}>
										<Button type="primary" disabled = {this.props.statusInd} style={submitStyle}> Disable </Button>
									</Col>
								</Row>
								<Row style={{padding:"5px"}}>
									<Col xs={8} sm={8} md={8} lg={8} style={LabelStyle}>
										<lable> Select cleints to enable  </lable>
									</Col>
									<Col xs={8} sm={8} md={8} lg={8}>
										<Select 
											mode="tags"
											onSelect = {this.OnSelect}
											onDeselect = {this.OnDeselect}
											style={{ width: '90%' }}>
											{this.loadClients(this.props.clients)}
										</Select>
									</Col>
									<Col xs={8} sm={8} md={8} lg={8}>
										<Button type="primary" disabled = {this.props.statusInd} style={submitStyle}> Enable</Button>
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
