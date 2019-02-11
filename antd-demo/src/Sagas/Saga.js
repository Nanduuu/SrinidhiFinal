import {takeEvery,takeLatest,all,put,call} from 'redux-saga/effects'
import axios from 'axios';
import setAuthJwt from '../utils/setAuthJwt';
import { push } from 'react-router-redux';
import { delay } from 'redux-saga'


function* do_login(action){
		console.log(action);
		const config = {     
						    headers: { 'content-type': 'multipart/form-data' }
						}
		var response = yield call(axios.post, "/api/login/",{"Data" : action.payload});
		if (response.data.success === true){
			const token = response.data.Token;
			localStorage.setItem('jwtToken',token);
			setAuthJwt(token);
			yield put({type : "SET_CURRENT_USER", user : response.data});
			if (response.data.Role === "admin"){
				yield put(push('/admin'));
			}else{
				
				yield put(push('/staff'));
			}
		}else{
			yield put({type:"AUTH_ERROR"});	
		}
}

function* do_logout(){

	localStorage.removeItem("jwtToken");
	setAuthJwt();
	yield put({type:'RE_SET_CURRENT_USER'});
	yield put(push('/'));
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function* do_addclient(action){
	yield put({type:"SET_ADD_CLIENT"});
	var response = yield call(axios.post, "/api/addclient/",{"Data" : action.payload});
			if (response.data.success === true){
				console.log(response);
				yield put({type:"RESET_ADD_CLIENT",msg:response.data.msg,success:response.data.success});
			}else{
				console.log(response);
				yield put({type:"RESET_ADD_CLIENT",msg:response.data.msg,success:response.data.success});
			}
			debugger;
	
}

 function* do_activegetClients(){
	var response = yield call(axios.post, "/api/activegetClients/",{});

	var clients = response.data.activeclients.map((client)=>{
		return client.ct_name;
	})
	yield put({type:'SET_ACTIVE_CLIENTS', clients:clients})

}

function* do_inactivegetClients(){
	var response = yield call(axios.post, "/api/inactivegetClients/",{});
	var clients = response.data.inactiveclients.map((client)=>{
		return client.ct_name;
	})
	console.log(clients);
	yield put({type:'SET_INACTIVE_CLIENTS', clients:clients})
}

function* do_disableClient(action){

	console.log(action)
	var response = yield call(axios.post, "/api/disableClient/",{"Data":action.payload});
	if(response){
		 yield	put ({type:"SET_DISABLE_CLIENT",success : response.data.success, msg:response.data.msg})
	}
}

function* do_enableClient(action){

	console.log("enable")
	var response = yield call(axios.post, "/api/enableClient/",{"Data":action.payload});
	if(response){
		 yield	put ({type:"SET_ENABLE_CLIENT",success : response.data.success, msg:response.data.msg})	
	}
}

function* do_getEditClient(action){

	
	var response = yield call(axios.post, "/api/getEditClient/",{"Data":action.payload});
	console.log(response.data.getEditClient)
	if(response){
		 yield	put ({type:"SET_EDIT_CLIENT",data:response.data.getEditClient})	
	}
}

function* do_updateEditClient(action){

	console.log("enable")
	var response = yield call(axios.post, "/api/updateEditClient/",{"Data":action.payload});
	if(response){
		 yield	put ({type:"RESET_EDIT_CLIENT",flag:response.data.success,msg:response.data.msg})	
	}
}

function* do_addShift(action){
	console.log(action.payload);
	var response = yield call(axios.post, "/api/addShift/",{"Data":action.payload});
	if(response){
		 yield	put ({type:"RESET_ADDSHIFT",flag:response.data.success,msg:response.data.msg})	
	}
}

function* do_getShiftDetails(action){
	console.log(action);
	var response = yield call(axios.post, "/api/getShiftDetails/",{"Data":action.payload});
	console.log(response.data.shiftDetails);
	if(response){
		 yield	put ({type:"SET_SHIFT_DETAILS",flag:response.data.success,shiftDetails:response.data.shiftDetails})	
	}
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

 function* do_addjob(action){
 	yield put({type:"SET_ADD_JOB"});
 	var response = yield call(axios.post, "/api/addJob/", {"Data" : action.payload});
 		if(response.data.success === true){

 		}
 	yield put({type:"RESET_ADD_JOB", msg:response.data.msg, success:response.data.success});
 }

 function* do_deleteClients(action){
 	console.log(action.payload);
 	var response = yield call(axios.post, "/api/deleteClients/",{'Data' : action.payload});
 }

 function* do_getJobDetails(action){
 	console.log(action.payload);
 	var response = yield call (axios.post, "/api/getJobDetails/",{'Data' : action.payload});
 	console.log(response.data.jobs)
 	yield put({type:"SET_JOB_DETAILS",jobDetails:response.data.jobs})
 }

 function* do_getJob(action){
 	console.log(action.payload);
 	var response = yield call (axios.post, "/api/getJob/",{'Data' : action.payload});
 	console.log(response.data.job)
 	yield put({type:"SET_JOB",job:response.data.job})
 }

 function* do_deleteJobs(action){
 	console.log("In delete Jobs");
 	console.log(typeof action.payload)
 	var response = yield call (axios.post, "/api/deleteJobs/",{'Data': action.payload});
 }

 function* do_updatejobdetails(action) {
 	var response = yield call (axios.post, "/api/updateeditjob/",{'Data':action.payload});

 	yield put ({type:"SET_EDIT_JOB", success:response.data.success, msg:response.data.msg})

 }

 function* do_staffgetjobdetails(action){
 	var response = yield call (axios.post, "/api/staffgetjobdetails/",{'Data':action.payload});
 	console.log("In saga");
 	yield put({ type : "SET_STAFF_JOB_DETAILS",success:response.data.success, jobDetails:response.data.jobs});

 }

export function* rootSaga() {

	yield takeEvery("LOGIN",do_login);
	yield takeEvery("LOGOUT",do_logout);

	yield takeLatest("ADDCLIENT",do_addclient);
	yield takeEvery("ACTIVEGETCLIENTS",do_activegetClients);
	yield takeEvery("INACTIVEGETCLIENTS",do_inactivegetClients);
	yield takeLatest("DISABLECLIENT", do_disableClient);
	yield takeLatest("ENABLECLINET", do_enableClient);
	yield takeLatest("GETEDITCLIENT",do_getEditClient);
	yield takeLatest("UPDATEEDITCLIENT",do_updateEditClient);
	yield takeLatest("ADDSHIFT",do_addShift);
	yield takeLatest("GETSHIFTDETAILS",do_getShiftDetails);


	yield takeLatest("ADDJOB",do_addjob);
	yield takeLatest("DELETECLECNTS",do_deleteClients);
	yield takeLatest("GETJOBDETAILS",do_getJobDetails);
	yield takeLatest("GETJOB",do_getJob);
	yield takeLatest("DELETEJOBS",do_deleteJobs);
	yield takeLatest("UPDATEJOBDETAILS",do_updatejobdetails);
	yield takeLatest("STAFFGETJOBDETAILS",do_staffgetjobdetails);

} 