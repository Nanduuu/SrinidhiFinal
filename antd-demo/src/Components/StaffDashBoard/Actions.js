export function staffgetjobdetails(data) {
	return{
		type : "STAFFGETJOBDETAILS",
		payload : data,
	}
}

export function staffConfirmJob(data){
	return{
		type:"STAFFCONFIRMJOB",
		payload:data,
	}
}

export function resetJobConfirmStatus(){
	return{
		type:"RESET_STAFF_CONFIRM_JOB_STATUS",
	
	}
}