import React from 'react';
import {connect} from 'react-redux';
import AddClientCharges from './AddClientCharges';
import AddStaffCharges from './AddStaffCharges';
import { Collapse ,Divider} from 'antd';
const Panel = Collapse.Panel;

const Namebar = (props)=>{
	return (<Divider orientation="left" style={{margin:0}}>
						<span>{props.text}</span> 
			</Divider> )
}

const mapStateToProps = (state)=>{
	return{
		
	}
}

const mapDispatchToProps = (dispatch)=>{
	return{
		
		
	}

}



class Invoice extends React.Component{
	constructor(props){
		super(props);
	}

	render(){
		return(
				<div>
					<Collapse accordion defaultActiveKey="2">
					<Panel header =  { <Namebar text= {"Client Invoice Details"} />} key="1">
						<AddClientCharges/>
					</Panel>
				
					<Panel header = { <Namebar text= { "Staff invoice Details"} />} key="2">
						<AddStaffCharges/>
					</Panel>
					
					
				</Collapse>


				</div>
			)
	}
}



export default connect( mapStateToProps,mapDispatchToProps) (Invoice);