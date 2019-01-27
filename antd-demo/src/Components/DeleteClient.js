import React from 'react';
import {Row, Col} from 'antd';
import { Select,Input,Button ,message} from 'antd';
import {connect} from 'react-redux';
import {getClients,deleteClients} from '../Redux/Actions';
import {Redirect} from 'react-router-dom';
const Option = Select.Option;

const LabelStyle = {

	textAlign:"center",
	paddingTop:"10px"
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
						<Col xs={1} sm={2} md={2} lg={3}>
						</Col>
						<Col xs={22} sm={20} md={20} lg={18}>
							<form onSubmit = {this.OnSubmit}>
								<Row>
									<Col xs={12} sm={12} md={12} lg={12} style={LabelStyle}>
										<lable>Select Client </lable>
									</Col>
									<Col xs={12} sm={12} md={12} lg={12}>
										<Select 
											mode="tags"
											onSelect = {this.OnSelect}
											onDeselect = {this.OnDeselect}
											style={{ width: '90%' }}>
											
											{this.loadClients(this.props.clients)}
										</Select>
									</Col>
								</Row>
								<Row style={{paddingTop:"10px"}}>
									<Col xs={24} sm={24} md={24} lg={24}>
										<Input type="submit" disabled = {this.props.statusInd} style={submitStyle} value = "Delete"/>
									</Col>
																
								</Row>
							</form>
						</Col>
						<Col xs={1} sm={2} md={2} lg={3}>
						</Col>

					</Row>
				</div>
		)
	}
}
export default connect (mapStateToProps,mapDispatchToProps) (DeleteClient);
