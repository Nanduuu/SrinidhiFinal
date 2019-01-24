import React from 'react';
import {Switch, Route,Link,Redirect} from 'react-router-dom';
import Header from './Header';
import Media from "react-media";
import {CcMenu} from './CcMenu';
import {connect } from 'react-redux';
import {CcDropdown} from './CcDropdown';
import Addclient from './Addclient';
import JobDetails from "./JobDetails";
import Jobdesc from './Jobdesc';
import PageNotForund from './PageNotFound';
import DeleteClient from './DeleteClient';
import InvoiceProcess from './InvoiceProcess';


const mapStateToProps = (state) => {
	
    return {
    	
    	authenticated:state.authenticated,
    	role:state.role
        
    }
}

const mapDispatchToProps = (dispatch)=>{
	return{
		
	}
}



class Admin extends React.Component{
	constructor(props){
		super(props);
		this.isredirect = this.isredirect.bind(this);
		this.validateUser = this.validateUser.bind(this);
	}

	componentDidMount(){
		console.log('admin')
		console.log(this.props);
	}
	isredirect = ()=>{
		if(this.authenticated){
			return <Redirect to='/'/>
		}
	}
	validateUser = ()=>{
		if(this.props.role !== 'admin'){
			return <PageNotForund/>
		}
	}
	render(){
		return(

				<div>
					
					<Header/>

						<Media query="(max-width: 599px)">
								          {matches =>
								            matches ? (
								               <CcDropdown {...this.props}/>
								            ) : (
								             
								              <CcMenu {...this.props}/>
								            )
								          }
				        </Media>
				     	
				     
				    
					<Switch>
			         	<Route path = '/admin/' exact component={Jobdesc} />
			          	<Route path ='/admin/addclient' component={Addclient} />
			      		<Route path ='/admin/Jobdetails' component={JobDetails} />
			      		<Route path ='/admin/deleteclient' component={DeleteClient} />
			      		<Route path ='/admin/invoiceprocess' component={InvoiceProcess} />
			          
			      	</Switch>	
					



				</div>


			)
	}

}



export default connect(mapStateToProps,mapDispatchToProps)(Admin);