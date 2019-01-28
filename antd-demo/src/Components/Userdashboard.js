import React from 'react';
import {Row,Col} from 'antd';
import { Calendar, Badge,Icon,Popover,Divider } from 'antd';
import {Table} from 'antd';
import {Redirect}  from 'react-router-dom';
import {connect} from 'react-redux';
import {staffgetjobdetails} from '../Redux/Actions';

const calStyle = {
    backgroundColor: "#b3e6ff",
    margin:"5px",
    borderRadius: '25px',

}

const columns = [{
  title: 'Client',
  dataIndex: 'Client',
  key: 'Client',
},
{
  title: 'Date',
  dataIndex: 'Date',
  key: 'Date',
},
 {
  title: 'From Time',
  dataIndex: 'from_time',
  key: 'from_time',
}, 
 {
  title: 'To Time',
  dataIndex: 'to_time',
  key: 'to_time',
},
{
  title: 'Action',
  dataIndex: 'Action',
  key: 'Action',
  render: (text, record) => (
    <span>
       <a href="javascript:;">Accept</a>
    </span>
  ),
}];

const mapStateToProps = (state)=>{
  console.log(state.user.Role)
  return {
    role : state.user.Role,
    jobs : state.staffjobDetails,
    stafftype : state.user.Stafftype,
    
  }

}
const mapDispatchToProps = (dispatch)=>{
    return{
        staffgetjobdetails : (data)=>{
          dispatch(staffgetjobdetails(data));
        },

    }

}


class Userdashboard extends React.Component{

	constructor(props){
		super(props);
    this.state = {
      selectedDateJobs : [],
    }
		
		this.dateCellRender = this.dateCellRender.bind(this);
    this.getListData = this.getListData.bind(this);
		
	}
  isvalidated = ()=>{
    if (this.props.role === 'staff'){
      return true;
    }
  }

  onSelect = (value) => {
   var date = value.format("YYYY-MM-DD");
    
    var selectedDateJobs = this.props.jobs.filter(function(item){
       return item.Date = date;
    })

    this.setState({
      selectedDateJobs : selectedDateJobs,
    })


  }

  OnChange = (value)=>{

    var date = new Date(value.format("YYYY-MM-DD"));
    var y = date.getFullYear();
    var m = date.getMonth();
    var firstDay = new Date(y, m, 1);
    var lastDay = new Date(y, m + 1, 0);

    var data = {
      from_date : firstDay,
      to_date : lastDay,
      stafftype : this.props.stafftype,
    }
    this.props.staffgetjobdetails(data);
  }

 dateCellRender =(value,dateString)=> {
  
  const listData = this.getListData(value);
  return (
    <div style={{padding:"2px"}}>

      <Popover placement="topLeft" title={"Hospital"} content={
             listData.map(item=>(
              <li key={item.Hospital}>
               {item.Client}
              </li> ))} >
          <Badge count={listData.length} style={{ backgroundColor: '#3366ff' }} >
          </Badge>
     </Popover>
    </div>
  ); 
} 
 getListData = (value)=> {
      var data =  this.props.jobs;
     let listData;
      listData = data.filter(function(list){
        if(list.Date == value.format("YYYY-MM-DD")){

        return list;
      }
      })
 
  return listData ;

}

componentDidMount(){

    var date = new Date();
    var y = date.getFullYear();
    var m = date.getMonth();
    var firstDay = new Date(y, m, 1);
    var lastDay = new Date(y, m + 1, 0);

    var data = {
      from_date : firstDay,
      to_date : lastDay,
      stafftype : this.props.stafftype,
    }
  this.props.staffgetjobdetails(data);
}

render(){
	return(
		<div>
      {this.isvalidated() ? null : <Redirect to ='/'/>}
			<Row>
				 <Col xs={0} sm={2} md={4} lg={7} > 
        </Col>
				<Col xs={24} sm={20} md={16} lg={10} > 
          <div style={calStyle} >
					   <Calendar  fullscreen={false} dateCellRender={this.dateCellRender} onSelect={this.onSelect} onChange = {this.OnChange} mode = "month" fullscreen = {true}/>
          </div>
				</Col>
       	<Col xs={0} sm={2} md={4} lg={7}> 
				</Col>
			</Row>	
      <Divider orientation="left">Accept Job</Divider>
      <Row>
         <Col xs={2} sm={2} md={4} lg={5} xl={5}> 
        </Col>
        <Col xs={20} sm={20} md={16} lg={14} xl={14}> 
            <Table columns={columns} size="medium" dataSource={this.state.selectedDateJobs}/>
        </Col>
        <Col xs={2} sm={2} md={4} lg={5} xl={5}> 
        </Col>
      </Row>  

		</div>
		)
}
}

export default connect(mapStateToProps,mapDispatchToProps) (Userdashboard);