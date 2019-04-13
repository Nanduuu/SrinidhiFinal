import React from 'react';
import { Table, Divider, Tag } from 'antd';
import {Row, Col } from 'antd';
import JobTable from './JobTable';
import EditJob from './EditJob';
import DeleteJob from './DeleteJob';
import Jobdesc from './Jobdesc';
import Bulkjobuploads from './Bulkjobuploads';
import { Collapse } from 'antd';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
const Panel = Collapse.Panel;

const Namebar = (props)=>{
	return (<Divider orientation="left" style={{margin:0 , backGroundColor : "#5f5f5f"}}>
						<span>{props.text}</span> 
			</Divider> )
}

const mapStateToProps = (state)=>{
	return{
		role : state.Reducer.user.Role,
		UserId : state.Reducer.user.UserId,
	}
}


class JobDetails extends React.Component{

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
			<Row>
				<Col>
				</Col>
				<Col>
					
					<Collapse accordion >
					<Panel header =  { <Namebar text= {"ADD JOB"} />} key="1">
						<Jobdesc/>
					</Panel>
				
				
				
					<Panel header = { <Namebar text= { "SCHEDULED JOBS"} />} key="2">
						<JobTable/>
					</Panel>

					<Panel header = { <Namebar text= { "BULK JOB UPLOAD"} />} key="3">
						<Bulkjobuploads/>
					</Panel>
									
				</Collapse>
					
				</Col>
				<Col>
				</Col>
			</Row>

		</div>

		)


	}

}

export default connect(mapStateToProps,null) (JobDetails);