import React from 'react';
import {Button} from 'antd';
import {Row,Dropdown,Menu, Col,Icon} from 'antd';
import { Link } from 'react-router-dom';


export class CcDropdown extends React.Component{

	constructor (props){
		super(props);
	}
	render(){
		const menu = (
					  <Menu>
					    <Menu.Item>
					    <Link to={'/admin/'}>  <Icon type="plus-square" />DASHBOARD</Link>
					    </Menu.Item>
					    <Menu.Item>
					     <Link to ='/admin/jobdetails'> <Icon type="clock-circle" />JOB DETAILS </Link>
					    </Menu.Item>
					    <Menu.Item>
					     <Link to='/admin/clientdetails'>  <Icon type="user" />CLIENT DETAILS </Link>
					    </Menu.Item>
					    <Menu.Item key="Invoice Process">
				          <Link to= { this.props.match.url + '/invoiceprocess'}>  <Icon type="user" />Invoice Process </Link>
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