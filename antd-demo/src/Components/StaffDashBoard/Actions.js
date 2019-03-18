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
