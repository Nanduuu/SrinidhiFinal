import React from 'react';
import  {Row,Col} from 'antd';
import { Calendar, Badge,Icon,Popover,Divider } from 'antd';
import {Table} from 'antd';

function getListData(value) {
  let listData;
  
  return listData || [];
}

const calStyle = {
    backgroundColor: "#b3e6ff",
    margin:"5px",
    borderRadius: '25px',

}

const columns = [{
  title: 'Hospital',
  dataIndex: 'Hospital',
  key: 'Hospital',
}, {
  title: 'Time',
  dataIndex: 'Time',
  key: 'Time',
}, {
  title: 'Action',
  dataIndex: 'Action',
  key: 'Action',
  render: (text, record) => (
    <span>
       <a href="javascript:;">Accept</a>
    </span>
  ),
}];

const dataSource = [{
  key: '1',
  Hospital: 'Narayana',
  Time: "10 to 12",
  
},{
  key: '2',
  Hospital: 'Forties',
  Time: "6 to 12",
  
},];


class Userdashboard extends React.Component{

	constructor(props){
		super(props);
		
		this.dateCellRender = this.dateCellRender.bind(this);
		
	}
 
  onSelect = (value) => {
    //alert(value)
  }

 dateCellRender =(value)=> {
  const listData = getListData(value);
  const text = "Hospitals";
  const content = (
    <div>
      <p>Narayana</p>
      <p>Forties</p>
    </div>
  );

  return (
    <div style={{padding:"2px"}}>
      <Popover placement="topLeft" title={text} content={content} >
          <Badge count={2} style={{ backgroundColor: '#3366ff' }} >
          </Badge>
     </Popover>
    </div>
  );
}


render(){
	return(
		<div>
			<Row>
				 <Col xs={0} sm={2} md={4} lg={5} xl={5}> 
        </Col>
				<Col xs={24} sm={20} md={16} lg={14} xl={14}> 
          <div style={calStyle}>
					   <Calendar  dateCellRender={this.dateCellRender} onSelect={this.onSelect} mode = "month" fullscreen = {true}/>
          </div>
				</Col>
       	<Col xs={0} sm={2} md={4} lg={5} xl={5}> 
				</Col>
			</Row>	
      <Divider orientation="left">Accept Job</Divider>
      <Row>
         <Col xs={2} sm={2} md={4} lg={5} xl={5}> 
        </Col>
        <Col xs={20} sm={20} md={16} lg={14} xl={14}> 
            <Table columns={columns} size="medium" dataSource={dataSource}/>
        </Col>
        <Col xs={2} sm={2} md={4} lg={5} xl={5}> 
        </Col>
      </Row>  

		</div>
		)
}
}

export default Userdashboard;