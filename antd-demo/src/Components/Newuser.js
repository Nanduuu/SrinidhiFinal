import React from 'react';
import { Modal, Button ,Input,Select} from 'antd';
import  {Row,Col}  from 'antd';
import axios from 'axios';
import {message} from 'antd';
import {Redirect  } from 'react-router';
import {Link} from 'react-router-dom'

const Option = Select.Option;

const success = (text)=>{
    message.success(text);
}

const error = (text)=>{
  message.error(text);
}

const InputStyle={
  width:"100%",
  padding:"2px 2px"
}

const header = {
  position:'fixed',
  height:'50%',
  width:"100%",
  background: '#4292f4'
}

const center = {
  position:'fixed',
  top:'50%',
  height:'40%',
  width:"100%",
  
}

const footer = {
  position:'fixed',
  top:"90%",
  height:'40%',
  width:"100%",
  background: '#4292f4'
}

var border={

  borderRadius: "25px",
  border: "2px solid #4292f4",
  backgroundColor : "white"
}

class Newuser extends React.Component {
	constructor(props){
		super(props);
		this.state={
			visible:false,
			loading:false,
			Fname:"",
			Lname:"",
			Email:'',
      Stafftype:"",
			Tel:'',
			Pword:"",
			Rpword:"",
      regSuccess:false,
		}
		this.Onchange = this.Onchange.bind(this);
		this.onCheck = this.onCheck.bind(this);

	}
showModal = () => {
    this.setState({
      visible: true,

    });
  }

  handleChangeStaff = (value)=> {
    
    this.setState({
      Stafftype : value
    })
  }

  Onchange = (event)=>{
  	 const name = event.target.name; 
  	 const value = event.target.value;
  	 switch (name)
  	 	{
  	 		case 'Fname' :
  	 			 this.setState({ 'Fname' : value} );
  	 			 break;
  	 		case 'Lname' :
  	 			 this.setState({ 'Lname' : value} );
  	 			 break;
  	 		case 'Email' :
  	 			 this.setState({ 'Email' : value} );
  	 			 break;
  	 		case 'Tel' :
  	 			 this.setState({ 'Tel' : value} );
  	 			 break;
  	 		case 'Pword' :
  	 			 this.setState({ 'Pword' : value} );
  	 			 break;
  	 		case 'Rpword' :
  	 			 this.setState({ 'Rpword' : value} );

  	 	}
  	
  	console.log(this.state);
  }

  onCheck=()=>{
  	if(this.state.Pword !== this.state.Rpword){
  		alert("password did not match");
    }
  }

  handleOk = ( event) => {

  	event.preventDefault();
    
    if(this.state.Pword !== this.state.Rpword && this.state.Pword !== null){
    	alert("password did not match");
    }else{

    let formData = new FormData();
    	formData.append('Fname',this.state.Fname);
    	formData.append('Lname',this.state.Lname);
    	formData.append('Email',this.state.Email);
    	formData.append('Tel',this.state.Tel);
    	formData.append('Pword',this.state.Pword);
      formData.append('Stafftype',this.state.Stafftype);

    	const config = {     
						    headers: { 'content-type': 'multipart/form-data' }
						}
		//console.log(formData.getAll());
    	axios.post('/api/newuser/',formData)
    		  .then( (res) =>{

    		  	if(res.data.success != true){
				          error(res.data.msg) 
    		  	}else{

              if(res.data.success == true){
    		  		  success(res.data.msg)
                this.setState({regSuccess:true})
              }else{
               // error(res.data.msg)
              }

    		  	}

    		  }).catch((error)=>{
    		  	//	error("Error");
    		  });

  	 
    }

    
  }

 

render (){

	return(

		<div>	
       {this.state.regSuccess ? <Link to='/' /> : null }
				<Row>	
          <div style={header}>
            </div>
            <div style={center}>
            </div>
            <div style={footer}>
            </div>
          <div style = {{position:"absolute",top:"25%",width:"100%",height:"50%"}}>
          <Col xs={2} sm={1} md={4} lg={6} xl={6}>
          </Col>
          <Col xs={20} sm={22} md={16} lg={12} xl={12}>
            <div style={{marginTop:'8%',width:'100%',color:'white' }}>
              NEW USER FORM
            </div>
					<form onSubmit = {this.handleOk}>
						<Input name="Fname" placeholder="Enter first name" onChange={this.Onchange} style={InputStyle} required />
						<Input name="Lname" placeholder="Enter last name" onChange={this.Onchange} style={InputStyle} />
            <Input name="Email" type="email" placeholder="Enter email Id" onChange={this.Onchange} style={InputStyle} required/>
            <Select value = {this.state.Stafftype} onChange={this.handleChangeStaff} placeholder={"Select Job Type"}  required>
                            <Option value="Doctor">Doctor</Option>
                            <Option value="Nurse">Nurse</Option>
                            <Option value="Health Care assistant (HCA)">Health Care assistant (HCA)</Option>
                            <Option value="Domestic worker">Domestic worker</Option>
                            <Option value="Domestic assistant">Domestic assistant</Option>
                            <Option value="Domiciliary carer">Domiciliary carer</Option>
                          </Select>
						<Input name="Tel" type="tel" placeholder="Enter Phone Number"  onChange={this.Onchange} style={InputStyle} required/>
						<Input name="Pword" type="password" placeholder={'Enter password'} onChange={this.Onchange} style={InputStyle} required/>
						<Input name="Rpword" type="password" placeholder={'Confirm password'} onBlur={this.onCheck} style={InputStyle}  onChange={this.Onchange} required/>
						


            <Row>
                <Col xs={12} sm={12} md={12} lg={12} xl={12} >
                    <Input style={{marginTop:'1%',width:'100%'}} type="submit" value="Submit"/> 
                 </Col>
                 <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                    <Button style={{marginTop:'1%',width:'100%'}} ><Link  to ={'/'}>Back </Link></Button>
                  </Col>
            </Row>    
					</form>
          </Col>
          <Col xs={2} sm={1} md={4} lg={6} xl={6}>
          </Col>
          </div>
          </Row>
				</div>
		)
	}
}
export default Newuser;







