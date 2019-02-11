export function addClient(data){
	return{
		type:'ADDCLIENT',
		payload:data,
	}
}

export function beginAddCleint(){
	return {
		type:'BEGIN_ADD_CLIENT',
	}
}
export function setaddclient() {
	return{
		type:"SET_ADD_CLIENT",
	}
}

export function activegetClients(){
	return {
		type:"ACTIVEGETCLIENTS",
	}
}

export function inactivegetClients(){
	return {
		type:"INACTIVEGETCLIENTS",
	}
}
export function disableClient(data){
	return{
		type : "DISABLECLIENT",
		payload : data,
	}
}
export function enableClient(data){
	return{
		type :"ENABLECLINET",
		payload:data,
	}
}
export function resetEnableClient(){
	return{
		type :"SET_ENABLE_CLIENT",
		
	}
}
export function resetDisableClient(){
	return{
		type :"RESET_DISABLE_CLIENT",
		
	}
}
export function getEditClient(data){
	return{
		type : "GETEDITCLIENT",
		payload:data,
	}
}
export function updateEditClient(data){
	return{
		type:"UPDATEEDITCLIENT",
		payload:data,
	}
}
export function addShift(data){
	return{
		type:"ADDSHIFT",
		payload:data,
	}
}
export function getShiftDetails(data){
	return{
		type:"GETSHIFTDETAILS",
		payload:data,
	}
}