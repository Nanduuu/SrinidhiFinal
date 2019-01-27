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

 function* do_getClients(){
	var response = yield call(axios.post, "/api/getClients/",{});

	var clients = response.data.clients.map((client)=>{
		return client.ct_branch;
	})
	//console.log(clients);
	yield put({type:'SET_CLIENTS', clients:clients})

}

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

export function* rootSaga() {

	yield takeEvery("LOGIN",do_login);
	yield takeEvery("LOGOUT",do_logout);
	yield takeLatest("ADDCLIENT",do_addclient);
	yield takeEvery("GETCLIENTS",do_getClients);
	yield takeLatest("ADDJOB",do_addjob);
	yield takeLatest("DELETECLECNTS",do_deleteClients);
	yield takeLatest("GETJOBDETAILS",do_getJobDetails);
	yield takeLatest("GETJOB",do_getJob);
	yield takeLatest("DELETEJOBS",do_deleteJobs);
	yield takeLatest("UPDATEJOBDETAILS",do_updatejobdetails);

} 