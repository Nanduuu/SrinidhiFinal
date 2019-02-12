export function activegetClients(){
	return {
		type:"ACTIVEGETCLIENTS",
	}
}

export function getShiftDetails(data){
	return{
		type:"GETSHIFTDETAILS",
		payload:data,
	}
}


export function addJob(data){
	return{
		type:"ADDJOB",
		payload:data
	}
}

export function setaddjob( ){
	return{
		type:"SET_ADD_JOB",
		
	}
}

export function getJob(data) {
	return{
		type:"GETJOB",
		payload:data,
	}
}







export function setaddclient() {
	return{
		type:"SET_ADD_CLIENT",
	}
}


export function getJobDetails(data){
	return{
		type:"GETJOBDETAILS",
		payload:data,
	}
}
export function deleteJobs(data) {
	return{
		type:"DELETEJOBS",
		payload:data,
	}
}


export function updatejobdetails(data) {
	return{
		type:"UPDATEJOBDETAILS",
		payload : data,
	}
}

export function resetEditJob() {
	return{
		type:"RESET_EDIT_JOB",
	}
}

export function staffgetjobdetails(data) {
	return{
		type : "STAFFGETJOBDETAILS",
		payload : data,
	}
}