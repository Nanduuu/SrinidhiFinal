import React from 'react';
import { Table, Divider, Tag } from 'antd';
import {Row, Col } from 'antd';
import JobTable from './JobTable';
import EditJob from './EditJob';
import DeleteJob from './DeleteJob';
	
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
					<JobTable/>
					<EditJob/>
					
				</Col>
				<Col>
				</Col>
			</Row>

			
		</div>

		)


	}

}

export default JobDetails;