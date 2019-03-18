import { combineReducers } from 'redux'
import {Reducer} from './Reducer';
import { ClientReducer } from './ClientReducer';
import {StaffDashboard} from './StaffDashboard';


var rootReducer = combineReducers({
	ClientDetails:ClientReducer,
	Reducer:Reducer,
	StaffDashboard:StaffDashboard,
})


export default rootReducer;