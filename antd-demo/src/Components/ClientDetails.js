import React from 'react';
import {Row,Col} from 'antd';
import {Button, Dropdown,Input}  from 'antd';
import {Menu, Icon,TimePicker} from 'antd';
import {Select,message,DatePicker ,InputNumber} from 'antd';
import moment from 'moment';
import {Redirect} from 'react-router-dom';
import { Divider } from 'antd';
import DeleteClient from "./DeleteClient";
import AddClient from './AddClient';
import EditClient from "./EditClient";
import DeleteShifts from "./DeleteShifts";
import AddShift from './AddShift';


class ClientDetails extends React.Component {
	
	constructor(props) {
		super(props)
			
	}

		
	render(){
		return(
			<div>
				<Divider style={{backgroundColor:"#4479a1"}}>
					<span style={{color:"white"}}>ADD CLIENT</span> 
				</Divider>
					<AddClient/>

				<Divider style={{backgroundColor:"#4479a1"}}>
					<span style={{color:"white"}}>ENABLE / DISABLE CLIENT</span> 
				</Divider>
					<DeleteClient/>


				<Divider style={{backgroundColor:"#4479a1"}}>
					<span style={{color:"white"}}>EDIT CLIENT</span> 
				</Divider>
					<EditClient/>

				<Divider style={{backgroundColor:"#4479a1"}}>
					<span style={{color:"white"}}>ADD SHIFTS</span> 
				</Divider>
				

				<Divider style={{backgroundColor:"#4479a1"}}>
					<span style={{color:"white"}}>DELETE SHIFTS</span> 
				</Divider>
				<DeleteShifts/>
			</div>
		)
	}
}

export default ClientDetails;