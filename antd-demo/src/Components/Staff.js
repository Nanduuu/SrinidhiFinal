import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Header from './Header';
import Media from "react-media";
import Userdashboard from './Userdashboard';
import {StaffCcDropdown} from './StaffCcDropdown';
import {StaffCcMenu} from './StaffCcMenu';
import StaffJobDetails from './StaffJobDetails';
import SubmitTimeSheet from './SubmitTimeSheet';
import PersonalDetails from './PersonalDetails';


class Staff extends React.Component{
	constructor(props){
		super(props);
	}

render(){
	return(

			<div>
				<Header/>
				<Media query="(max-width: 599px)">
								          {matches =>
								            matches ? (
								               <StaffCcDropdown {...this.props}/>
								            ) : (
								             
								              <StaffCcMenu {...this.props}/>
								            )
								          }
				</Media>	
				<Route path = '/staff/' exact component={Userdashboard} />
			    <Route path ='/staff/jobdetails' component={StaffJobDetails} />
			    <Route path ='/staff/Submittimesheet' component={SubmitTimeSheet} />
			    <Route path ='/staff/personaldetails' component={PersonalDetails} />		

			</div>


		);
}

}

export default Staff;