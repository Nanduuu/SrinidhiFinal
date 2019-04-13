import React from 'react';
import { Table, Button} from 'antd';
import {connect} from 'react-redux';
import {getUserDetails,enable_disable_user} from './Actions';
import {Redirect} from 'react-router-dom';


const mapStateToProps = (state)=>{
	return{
		userDetails : state.ClientDetails.userDetails,
    role : state.Reducer.user.Role,
	}
}

const mapDispatchToProps = (dispatch)=>{
	return {
		getUserDetails : ( )=>{
			dispatch(getUserDetails());
		},
		enable_disable_user:(data)=>{
			dispatch(enable_disable_user(data));
		},
	}
}


const Accept = (props)=>{
   return(
      <div>
            <Button type = {new Date(props.record.end_date) < new Date('2038-01-19') ? 'primary' : 'danger'} 
                onClick = {()=> { props.click(props.record)}}>
            	{new Date(props.record.end_date) < new Date('2038-01-19') ? 'Enable' : 'Disable'}
            </Button> 
      </div>
    )
 }

class UserDetails extends React.Component{
	constructor(props){
		super(props);
	}

componentDidMount(){

	this.props.getUserDetails();

}

onEnableDisable = (input)=>{

	this.props.enable_disable_user(input);
}

componentWillReceiveProps(nextProps){

    if(nextProps.userDetails != this.props.userDetails){
       this.props.getUserDetails();
    }
}
isvalidated = ()=>{
    if (this.props.role !== 'staff'){
      return true;
    }
  }

render(){

	const columns = [{
        title: 'User ID',
        dataIndex: 'Userid',
        key: 'userid',
       },
      {
        title: 'First Name',
        dataIndex: 'Fname',
        key: 'Fname',

      },
       {
        title: 'Last Name',
        dataIndex: 'Lname',
        key: 'Lname',
        
      }, 
       {
        title: 'TelePhone',
        dataIndex: 'Tel',
        key: 'Tel',
      },{
        title: 'EmailID',
        dataIndex: 'Emailid',
        key: 'Emailid',
      },
      {
        title: 'Staff Type',
        dataIndex: 'stafftype',
        key: 'stafftype',
      },
      {
        title: 'Action',
        dataIndex: 'Action',
        key: 'Action',
        width: 100,
        fixed : 'right',
        render: (text, record) => (
          <span>
              <Accept click = {this.onEnableDisable} record={record}/>
          </span>
        ),
      }];
	return(
			<div style={{margin:'5px'}}>
        {this.isvalidated() ? null : <Redirect to ='/PageNotFound'/>}
				<Table style={{margin:'0px'}} columns={columns} scroll={{ x:800}} 
        pagination= { {pageSizeOptions: ['5','10'], showSizeChanger: true}} dataSource={this.props.userDetails}/>
			</div>
 		) 
    }

}

export default connect(mapStateToProps,mapDispatchToProps) (UserDetails);