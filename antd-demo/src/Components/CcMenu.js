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
			current: 'Add Job'
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
												      current: "Job Details",
												    });
		 			break;
		 	case "/admin/addclient" : this.setState({
												      current: "Add Client",
												    });
		 			break;
		 	case "/admin/deleteclient" : this.setState({
												      current: "Delete Client",
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
		        <Menu.Item key="Add Job">
		          <Link to={this.props.match.url}>  <Icon type="plus-square" />Add Job </Link>
		        </Menu.Item>
		        <Menu.Item key="Job Details">
		          <Link to = { this.props.match.url + '/jobdetails'}> <Icon type="clock-circle" />Job Details </Link>
		        </Menu.Item>
		        <Menu.Item key="Add Client">
		          <Link to= { this.props.match.url + '/addclient'}>  <Icon type="user" />Add Client </Link>
		        </Menu.Item>
		        <Menu.Item key="Delete Client">
		          <Link to= { this.props.match.url + '/deleteclient'}>  <Icon type="user" />Delete Client </Link>
		        </Menu.Item>
		        <Menu.Item key="Invoice Process">
		          <Link to= { this.props.match.url + '/invoiceprocess'}>  <Icon type="user" />Invoice Process </Link>
		        </Menu.Item>
		        
		      </Menu>
			

		 </div> )
	}
};