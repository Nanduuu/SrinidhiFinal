import React from 'react';


const style = {
	border : "1px solid"


}

var Box =(props)=>{

	return <div style={style}> 
			<p>Box {props.name} </p>


		</div>
	};




class Test extends React.Component{

render(){
 return(
 		<div>

 				<h1> Hello world</h1>
 				<Box name="nanda"/>
 				<Box name="kumar"/>

 		</div>
 	);

}

}

export default Test;

<Row  style	={{padding:"10px"}}>
																<Col xs={12} sm={12} md={12} lg={12} xl={12}>
																	<Button onClick={this.redirect}>Newuser</Button>
																</Col>
																<Col xs={12} sm={12} md={12} lg={12} xl={12}>
																	<Forgotpword/>
																</Col >
															</Row>