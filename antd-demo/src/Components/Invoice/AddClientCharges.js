import React from 'react';
import {connect} from 'react-redux';
import {
  Table, Input, InputNumber, Popconfirm, Form, Select, Row, Col, Button, message
} from 'antd';
import { getClientInvoiceRates ,updateInvoiceRates} from './Actions';

import NumericInput  from '../NumericInput';
const Option = Select.Option;

const mapStateToProps = (state)=>{
	return{

		clientInvoiceRates : state.Reducer.clientInvoiceRates,
	}
}

const error = (data) => {
  message.error(data);
};

const success = (data)=>{
	message.success(data);
}

const mapDispatchToProps =(dispatch)=>{
	return{
		getClientInvoiceRates : ()=>{
			dispatch(getClientInvoiceRates());
		},
		updateInvoiceRates : (data)=>{
			dispatch(updateInvoiceRates(data));
		}
	}

}

const columns = [{
  title: 'Staff',
  dataIndex: 'staff_type',
  key: 'staff_type',
}, {
  title: 'Long Day',
  dataIndex: 'Long_day',
  key: 'Long_day',
}, {
  title: 'Early',
  dataIndex: 'Early',
  key: 'Early',
},{
  title: 'Late',
  dataIndex: 'Late',
  key: 'Late',
},{
  title: 'Night',
  dataIndex: 'Night',
  key: 'Night',
},{
  title: 'Saturday',
  dataIndex: 'Saturday',
  key: 'Saturday',
},{
  title: 'Sunday',
  dataIndex: 'Sunday',
  key: 'Sunday',
},{
  title: 'Sleep Night',
  dataIndex: 'Sleep_night',
  key: 'Sleep_night',
},{
  title: 'Bank Holiday',
  dataIndex: 'Bank_holiday',
  key: 'Bank_holiday',
}];



class AddClientCharges extends React.Component{
	constructor(props){
		super(props);

		this.state = {
			shift_type : "",
			staff_type:"",
			value:"",
		}

	}

	componentDidMount(){
 
		   this.props.getClientInvoiceRates();
	}

	handleChangeStaff = (value)=> {
	  
	  this.setState({
	  	staff_type : value
	  })
	}

	OnShiftChange = (value)=>{
		this.setState({
			shift_type:value,
		})
	}

	onChange = (value) => {
    this.setState({ value });
  }

  	update = ()=>{

  		var data = {};
  		if(this.state.staff_type  != ''){
  			if (this.state.shift_type != ''){
  				if(this.state.value != ''){
  					 data = {
  						staff_type : this.state.staff_type,
  						shift_type : this.state.shift_type,
  						value : this.state.value,
  						tablename : 'ctinvoice',
  					}

  					this.props.updateInvoiceRates(data);

  					}else{
  						error("Please enter Rate")
  					}
  				}else{

  					error("Please select Shift Type")
  				}
  			}else{
  				error("Please select Staff Type")
  			}
  		}

  	

	render(){
		return(
				<div>
						<Table

						columns={columns}
						dataSource ={this.props.clientInvoiceRates}
						scroll={{ x: 1000 }}
						size="small"
						>

						</Table>
						<Row>	
							
							<Col xs={10} sm={10} md={10} lg={10}>
							
							<Select  onChange={this.OnShiftChange} value={this.state.shift_type} style={{width:"100%"}}>
								            <Option value="Early">Early</Option>
								            <Option value="Late">Late</Option>
								            <Option value="Long Day">Long Day</Option>
								            <Option value="Night">Night</Option>
								            <Option value="Saturday">Saturday</Option>
								            <Option value="Sunday">Sunday</Option>
								            <Option value="Sleep Night">Sleep Night</Option>
								          </Select>
							</Col>
							<Col xs={10} sm={10} md={10} lg={10}> 
							<Select value = {this.state.staff_type} onChange={this.handleChangeStaff} style={{width:"100%"}}>
								            <Option value="Doctor">Doctor</Option>
								            <Option value="Nurse">Nurse</Option>
								            <Option value="Health Care assistant (HCA)">Health Care assistant (HCA)</Option>
								            <Option value="Domestic worker">Domestic worker</Option>
								            <Option value="Domestic assistant">Domestic assistant</Option>
								            <Option value="Domiciliary carer">Domiciliary carer</Option>
								          </Select>
							</Col>
							<NumericInput style={{ width: 120 }} value={this.state.value} onChange={this.onChange} />
							<Button onClick={this.update}>Update</Button>
						</Row>

				</div>
			)
	}
}

export default connect( mapStateToProps,mapDispatchToProps) (AddClientCharges);