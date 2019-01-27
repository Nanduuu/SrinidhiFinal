import React from 'react';
import {Button} from 'antd';
import {Row,Dropdown,Menu, Col,Icon} from 'antd';
import { Link ,Select} from 'react-router-dom';



export  default class StaffCcDropdown extends React.Component{

	constructor (props){
		super(props);
	}
	render(){
		const menu = (
					  <Menu>
					    <Menu.Item>
					    <Link to={'/staff/'}>  <Icon type="plus-square" />Dash Board </Link>
					    </Menu.Item>
					    <Menu.Item>
					     <Link to ='/staff/jobdetails'> <Icon type="clock-circle" />Job Details </Link>
					    </Menu.Item>
					    <Menu.Item>
					     <Link to='/staff/Submittimesheet'>  <Icon type="user" />Submit TimeSheet </Link>
					    </Menu.Item>
					    <Menu.Item>
					    <Link to ="/staff/personaldetails">  <Icon type = "user" />  Personal Details </Link>
					    </Menu.Item>
					  </Menu>
					);

		return ( <div>

			<Row >
				<Col xs={2} sm={2} md={2}>
					    <Dropdown overlay={menu} placement="bottomCenter" >
					      <Button><Icon type="menu-fold" theme="outlined" style ={{width:"50%",height:"100%"}} /></Button>
					    </Dropdown>
				</Col>
			</Row>

			

		 </div> )
	}
};