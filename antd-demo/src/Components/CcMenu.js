import React from 'react';
import {Button} from 'antd';
import { Menu, Icon } from 'antd';
import { Link } from 'react-router-dom';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

export class CcMenu extends React.Component{

	constructor (props){
		super(props);
		this.state = {
			current: 'DASHBOARD'
		}
	}

	handleClick = (e) => {
		    console.log('click ', e);
		    this.setState({
		      current: e.key,
		    });
		  }

	componentDidMount = ()=>{
		var current = this.props.location.pathname;
		
		 switch (current) {
		 	case "/admin/jobdetails" : this.setState({
												      current: "JOB DETAILS",
												    });
		 			break;
		 	case "/admin/clientdetails" : this.setState({
												      current: "CLIENT DETAILS",
												    });
		 			break;
		 	case "/admin/invoiceprocess" : this.setState({
												      current: "INVOICE",
												    });
		 			break;
		 	case "/admin/UserDetails" : this.setState({
												      current: "USER DETAILS",
												    });
		 			break;

		 }
	}

	render(){

		return ( <div>

			<Menu
				
		        onClick={this.handleClick}
		        selectedKeys={[this.state.current]}
		        mode="horizontal"

		      >
		        <Menu.Item key="DASHBOARD">
		          <Link to={this.props.match.url}>  <Icon type="plus-square" />  DASHBOARD  </Link>
		        </Menu.Item>
		        <Menu.Item key="JOB DETAILS">
		          <Link to = { this.props.match.url + '/jobdetails'}> <Icon type="clock-circle" />JOB DETAILS </Link>
		        </Menu.Item>
		        <Menu.Item key="CLIENT DETAILS">
		          <Link to= { this.props.match.url + '/clientdetails'}>  <Icon type="user" />CLIENT DETAILS </Link>
		        </Menu.Item>
		        
		        <Menu.Item key="INVOICE">
		          <Link to= { this.props.match.url + '/invoiceprocess'}>  <Icon type="user" />INVOICE </Link>
		        </Menu.Item>

		         <Menu.Item key="USER DETAILS">
		          <Link to= { this.props.match.url + '/UserDetails'}>  <Icon type="user" />USER DETAILS </Link>
		        </Menu.Item>
		        
		      </Menu>
			

		 </div> )
	}
};