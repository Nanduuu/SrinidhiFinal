import React from 'react';
import {Button} from 'antd';



export class SubButton extends React.Component{

	constructor (props){
		super(props);
	}

	render(){

		return ( <div><Button> 

			Submit

		 </Button></div> )
	}
};

export class LogOutButton extends React.Component{

	constructor (props){
		super(props);
	}

	render(){

		return ( <div><Button type = "defalt"> 

			Logout

		 </Button></div> )
	}
};

