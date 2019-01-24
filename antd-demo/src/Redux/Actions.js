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
export function addClient(data){
	return{
		type:'ADDCLIENT',
		payload:data,
	}
}
export function deleteClients(data){
	return{
		type:"DELETECLECNTS",
		payload:data,
	}
}
export function beginAddCleint(){
	return {
		type:'BEGIN_ADD_CLIENT',
	}
}
export function getClients(){
	return{
		type:'GETCLIENTS',
	}
}
export function addJob(data){
	return{
		type:"ADDJOB",
		payload:data
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