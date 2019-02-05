import React from 'react';
import { Table, Divider, Tag } from 'antd';
import {Row, Col } from 'antd';
import JobTable from './JobTable';
import EditJob from './EditJob';
import DeleteJob from './DeleteJob';
import Jobdesc from './Jobdesc';
	
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
					<Divider style={{backgroundColor:"#4479a1"}}>
						<span style={{color:"white"}}>ADD JOB</span> 
					</Divider>
					<Jobdesc/>
					<Divider style={{backgroundColor:"#4479a1"}}>
						<span style={{color:"white"}}>EDIT JOB</span> 
					</Divider>
					<EditJob/>
					<Divider style={{backgroundColor:"#4479a1"}}>
						<span style={{color:"white"}}>JOB LIST</span> 
					</Divider>
					<JobTable/>
					
				</Col>
				<Col>
				</Col>
			</Row>

			
		</div>

		)


	}

}

export default JobDetails;