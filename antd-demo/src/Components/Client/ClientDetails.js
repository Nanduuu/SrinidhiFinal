import React from 'react';
import {Row,Col} from 'antd';
import {Button, Dropdown,Input}  from 'antd';
import {Menu, Icon,TimePicker} from 'antd';
import {Select,message,DatePicker ,InputNumber} from 'antd';
import moment from 'moment';
import {Redirect} from 'react-router-dom';
import { connect } from 'react-redux';
import { Divider } from 'antd';
import AddClient from './AddClient';
import DeleteClient from "./DeleteClient";
import EditClient from "./EditClient";
import DeleteShifts from "./DeleteShifts";
import AddShift from './AddShift';
import { Collapse } from 'antd';

const Panel = Collapse.Panel;

const Namebar = (props)=>{
	return (<Divider orientation="left" style={{margin:0}}>
						<span>{props.text}</span> 
			</Divider> )
}


const customPanelStyle = {
  background: '#f7f7f7',
  borderRadius: 4,
  marginBottom: 24,
  border: 0,
  overflow: 'hidden',
};




class ClientDetails extends React.Component {
	
	constructor(props) {
		super(props)
			
	}
	
	
	render(){
		
		return(
				<div>
				<Collapse accordion defaultActiveKey="1">
					<Panel header =  { <Namebar text= {"ADD CLIENT"} />} key="1">
						<AddClient/>
					</Panel>
				
					<Panel header = { <Namebar text= { "DELETE CLIENT"} />} key="2">
						<DeleteClient/>
					</Panel>
				
					<Panel header = { <Namebar text= { "EDIT CLIENT"} />} key="3">
						<EditClient/>
					</Panel>
				
					<Panel header = { <Namebar text= {"ADD SHIFT"} />} key="4">
						<AddShift/>
					</Panel>
			
					<Panel header = { <Namebar text= {"DELETE SHIFT"} />} key="5">
						<DeleteShifts/>
					</Panel>
				</Collapse>

						
			</div>
			
			)
	}
}
export default ClientDetails;