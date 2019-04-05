import React from 'react';
import { Table, Divider, Tag } from 'antd';
import {Row, Col } from 'antd';
import JobTable from './JobTable';
import EditJob from './EditJob';
import DeleteJob from './DeleteJob';
import Jobdesc from './Jobdesc';
import Bulkjobuploads from './Bulkjobuploads';
import { Collapse } from 'antd';
const Panel = Collapse.Panel;

const Namebar = (props)=>{
	return (<Divider orientation="left" style={{margin:0}}>
						<span>{props.text}</span> 
			</Divider> )
}


class JobDetails extends React.Component{

	constructor(props){
		super(props);
	}

render(){
	return(
		<div>
			<Row>
				<Col>
				</Col>
				<Col>
					
					<Collapse accordion >
					<Panel header =  { <Namebar text= {"ADD JOB"} />} key="1">
						<Jobdesc/>
					</Panel>
				
					<Panel header = { <Namebar text= { "EDIT JOB"} />} key="2">
						<EditJob/>
					</Panel>
				
					<Panel header = { <Namebar text= { "SCHEDULED JOBS"} />} key="3">
						<JobTable/>
					</Panel>

					<Panel header = { <Namebar text= { "BULK JOB UPLOAD"} />} key="4">
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

export default JobDetails;