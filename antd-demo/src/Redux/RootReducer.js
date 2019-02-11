import { combineReducers } from 'redux'
import {Reducer} from './Reducer';
import { ClientReducer } from './ClientReducer';


var rootReducer = combineReducers({
	ClientDetails:ClientReducer,
	Reducer:Reducer,
})


export default rootReducer;