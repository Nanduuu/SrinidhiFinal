import React from 'react';
import {Row, Col} from 'antd';
import { Select,Input,Button } from 'antd';
import { Divider } from 'antd';
import {connect} from 'react-redux';
import {getClients} from '../Redux/Actions';

const LabelStyle = {

	textAlign:"center",
	paddingTop:"10px"
}
const mapDispatchToProps = (dispatch)=>{
	return{
		getClients : ( )=>{
			dispatch(getClients());
		},
			
	}

}
const mapStateToProps = (state)=>{
	return {
		role : state.user.Role,
		clients:state.clients,
	}
}

class DeleteJob extends React.Component{
	constructor(props){
		super(props);
	}
	render(){
		return(
				<div style={{margin:'20px'}}>
					<Divider orientation="left">Delete Job</Divider>
					<Row>
						<Col xs= {1} sm={1} md={2} lg={3}>
			      		</Col>
						<Col xs={22} sm={22} md={20} lg={18}>
							<Row>
								<Col xs={8} sm={8} md={8} lg={8} style={LabelStyle}>
									<lable> Enter Job ID </lable>
								</Col>
								<Col xs={8} sm={8} md={8} lg={8} >
									<Input />
								</Col>
								<Col xs={8} sm={8} md={8} lg={8} >
									<Button type="primary">Delete Job</Button>
								</Col>
							</Row>
						</Col>
						<Col xs= {1} sm={1} md={2} lg={3}>
			      		</Col>
					</Row>
					<Divider/>
				</div>
			)
	}
}

export default connect (mapStateToProps, mapDispatchToProps) (DeleteJob);