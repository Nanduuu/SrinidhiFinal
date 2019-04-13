import React from 'react';
import {Row, Col } from 'antd';
import { Select,Input,Button ,message} from 'antd';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {activegetClients,getEditClient,updateEditClient} from './Actions';
const Option = Select.Option;
const { TextArea } = Input;


const InputStyle={
	width:"90%",
	padding:"5px"
}
const LabelStyle = {
	textAlign:"left",
	paddingTop:"10px",
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

const mapStateToProps = (state)=>{
	return{
		clients : state.ClientDetails.activeClients,
		editClient : state.ClientDetails.getEditClient,
		updateClientFlag : state.ClientDetails.updateClientFlag,
		updateClientMsg: state.ClientDetails.updateClientMsg,
	}
}

const mapDispatchToProps =(dispatch)=>{
	return{
		activegetClients : ()=>{
			dispatch(activegetClients());
		},
		getEditClient : (data)=>{
			dispatch(getEditClient(data));
		},
		updateEditClient :(data)=>{
			dispatch(updateEditClient(data));
		}
	}
}

class EditClient extends React.Component{

constructor(props){
		super(props);
		this.state = {
			clients : [],
			ct_name:"",
			ct_street_number:"",
			ct_street_name:"",
			ct_city_name:"",
			ct_pin:"",
			ct_id:"",
		}
		this.loadAtiveClients = this.loadActiveClients.bind(this);
	}

componentWillReceiveProps = (nextProps)=>{
	if(nextProps.editClient != this.props.editClient){
		this.setState({
			ct_street_number :nextProps.editClient.ct_street_number,
		    ct_street_name:nextProps.editClient.ct_street_name, 
		    ct_pin :nextProps.editClient.ct_pincode,
		    ct_city_name :nextProps.editClient.ct_city_name,
		    ct_id : nextProps.editClient.ct_id,
		} )
	}
	if(nextProps.updateClientMsg){

		if(nextProps.updateClientFlag == true){
			success(nextProps.updateClientMsg);
			this.reset();
		}
		if(nextProps.updateClientFlag == false){
			error(nextProps.updateClientMsg);
		}
	}
}

componentDidMount(){
	this.props.activegetClients();
}

Onchange = (e)=>{

	this.setState({
		[e.target.name]:e.target.value
	})
	
}

OnSubmit = ()=>{

		if(!this.state.ct_city_name || !this.state.ct_street_name || !this.state.ct_street_number || !this.state.ct_pin){
			error("Please fill all the fields")
		}else{
			var data = { 
				ct_id : this.state.ct_id,
				ct_name : this.state.ct_name,
				ct_street_number : this.state.ct_street_number,
				ct_street_name : this.state.ct_street_name,
				ct_city_name : this.state.ct_city_name,
				ct_pincode : this.state.ct_pin,
			 }
			this.props.updateEditClient(data);
		}
}

OnSelect =(value)=>{
	this.setState({
		ct_name : value,
	})

	this.props.getEditClient(value);
}

reset = ()=>{
		console.log(this.state);
		this.setState({
			ct_name :"",
			ct_id:this.props.nextClientId,
			ct_street_name:"",
			ct_pin:"",
			ct_street_number:"",
			ct_city_name:""
		})
		console.log(this.state);
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
			<Row style={{padding:'5px'}}>
					<Col xs={2} sm={2} md={4} lg={5} >
					</Col>
					<Col xs={20} sm={20} md={16} lg={14}>
						<Row>
							<Col>
								<Row>
									<Col xs={12} sm={12} md={12} lg={12} style={LabelStyle} >
										<label> <b> Selct Client </b> </label>
									</Col>
									<Col xs={12} sm={12} md={12} lg={12}>
										<Select 
											onSelect = {this.OnSelect}
											value = {this.state.ct_name}
											style={{ width: '90%' }}>
											{this.loadActiveClients(this.props.clients)}
											
										</Select>   
									</Col>
								</Row>
								<Row>
									<Col xs={12} sm={12} md={12} lg={12} style={LabelStyle}>
										<label style={LabelStyle}> <b> Street Number </b></label>
									</Col>
									<Col xs={12} sm={12} md={12} lg={12}>
										<Input style={{ width: '90%' }} name="ct_street_number" value= {this.state.ct_street_number} style={InputStyle} onChange={this.Onchange} required / >

									</Col>
								</Row>
								<Row>
									<Col xs={12} sm={12} md={12} lg={12} style={LabelStyle}>
										<label> <b>Street Name </b></label>
									</Col>
									<Col xs={12} sm={12} md={12} lg={12}>
										<Input style={{ width: '90%' }} name = "ct_street_name" value= {this.state.ct_street_name} style={InputStyle} onChange={this.Onchange} required />
									</Col>

								</Row>
								<Row>
									<Col xs={12} sm={12} md={12} lg={12} style={LabelStyle}>
										<label> <b> City Name </b> </label>
									</Col>
									<Col xs={12} sm={12} md={12} lg={12}>
										<Input style={{ width: '90%' }} name = "ct_city_name" value= {this.state.ct_city_name} style={InputStyle} onChange={this.Onchange} required />
									</Col>

								</Row>
								<Row>
									<Col xs={12} sm={12} md={12} lg={12} style={LabelStyle}>
										<label> <b> Pin Code </b> </label>
									</Col>
									<Col xs={12} sm={12} md={12} lg={12}>
										<Input style={{ width: '90%' }} name="ct_pin"  placeholder="Please enter AlphaNumeric Pincode"  pattern="^[0-9a-zA-Z_ ]{1,8}$" style={InputStyle} value= {this.state.ct_pin} onChange={this.Onchange} required/>
									</Col>

								</Row>
								<Row style={{paddingTop:"10px"}}>
									<Col xs={12} sm={12} md={12} lg={12}>
										<Button type="primary" onClick ={this.OnSubmit} style={submitStyle} >UPDATE </Button>
									</Col>
									<Col xs={12} sm={12} md={12} lg={12}>
										<Button type="danger " style={submitStyle}  onClick={this.reset}>RESET</Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(EditClient)