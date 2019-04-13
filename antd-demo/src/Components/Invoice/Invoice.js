import React from 'react';
import {connect} from 'react-redux';
import AddClientCharges from './AddClientCharges';
import AddStaffCharges from './AddStaffCharges';
import ApproveTimeSheets from './ApproveTimeSheets';
import { Collapse ,Divider} from 'antd';
import {Redirect} from 'react-router-dom';


const Panel = Collapse.Panel;

const Namebar = (props)=>{
	return (<Divider orientation="left" style={{margin:0}}>
						<span>{props.text}</span> 
			</Divider> )
}

const mapStateToProps = (state)=>{
	return{
		role : state.Reducer.user.Role,
		UserId : state.Reducer.user.UserId,
		
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

	isvalidated = ()=>{
		if (this.props.role !== 'staff'){
			return true;
		}
	}
	render(){
		return(
				<div>
					{this.isvalidated() ? null : <Redirect to ='/PageNotFound'/>}
					<Collapse accordion >
					<Panel header =  { <Namebar text= {"Client Invoice Details"} />} key="1">
						<AddClientCharges/>
					</Panel>
				
					<Panel header = { <Namebar text= { "Staff invoice Details"} />} key="2">
						<AddStaffCharges/>
					</Panel>
					<Panel header = { <Namebar text= { "Approve Time Sheets"} />} key="3">
						<ApproveTimeSheets/>
					</Panel>
					
				</Collapse>


				</div>
			)
	}
}



export default connect( mapStateToProps,mapDispatchToProps) (Invoice);