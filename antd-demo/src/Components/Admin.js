import React from 'react';
import {Switch, Route,Link,Redirect} from 'react-router-dom';
import Header from './Header';
import Media from "react-media";
import {CcMenu} from './CcMenu';
import {connect } from 'react-redux';
import {CcDropdown} from './CcDropdown';
import ClientDetails from './Client/ClientDetails';
import JobDetails from "./Job/JobDetails";
import PageNotForund from './PageNotFound';
import InvoiceProcess from './InvoiceProcess';
import AdminDashboard from './Jobdashboard/AdminDashboard';
import Invoice from './Invoice/Invoice';
import UserDetails from './Users/UserDetails';


const mapStateToProps = (state) => {
	
    return {
    	
    	authenticated:state.authenticated,
    	role:state.role
        
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
			         	<Route path = '/admin/' exact component={AdminDashboard} />
			          	<Route path ='/admin/clientdetails' component={ClientDetails} />
			      		<Route path ='/admin/Jobdetails' component={JobDetails} />
			      		<Route path ='/admin/invoiceprocess' component={Invoice} />
			      		<Route path = '/admin/UserDetails' component={UserDetails}/>
			          
			      	</Switch>	
					



				</div>


			)
	}

}



export default connect(mapStateToProps)(Admin);