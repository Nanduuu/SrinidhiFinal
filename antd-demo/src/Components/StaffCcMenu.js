import React from 'react';
import {Button} from 'antd';
import { Menu, Icon } from 'antd';
import { Link } from 'react-router-dom';
import {Redirect}  from 'react-router-dom';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

export class StaffCcMenu extends React.Component{

	constructor (props){
		super(props);
		this.state = {
			current: 'Dash Board'
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
		 	case "/staff/jobdetails" : this.setState({
												      current: "Job Details",
												    });
		 			break;
		 	case "/staff/Submittimesheet" : this.setState({
												      current: "Submit TimeSheet",
												    });
		 			break;
		 	case "/staff/personaldetails" : this.setState({
												      current: "Persobal Details",
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
		        <Menu.Item key="Dash Board">
		          <Link to={this.props.match.url}>  Dash Board </Link>
		        </Menu.Item>
		        <Menu.Item key="Job Details">
		          <Link to = { this.props.match.url + '/jobdetails'}>Job Details </Link>
		        </Menu.Item>
		        <Menu.Item key="Submit TimeSheet">
		          <Link to= { this.props.match.url + '/Submittimesheet'}>    Submit TimeSheet </Link>
		        </Menu.Item>
		        <Menu.Item key="Persobal Details">
		          <Link to= { this.props.match.url + '/personaldetails'}>  Personal Details </Link>
		        </Menu.Item>
	        
		      </Menu>
		 </div> )
	}
};