export function login(data){
	return{
		type:"LOGIN",
		payload:data,
	}
}
export function logout(){
	return {
		type : "LOGOUT",
	}
}

export function beginAddCleint(){
	return {
		type:'BEGIN_ADD_CLIENT',
	}
}
export function deleteClients(data){
	return{
		type:"DELETECLECNTS",
		payload:data,
	}
}
export function getClients(){
	return{
		type:'GETCLIENTS',
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
export function getJob(data) {
	return{
		type:"GETJOB",
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

