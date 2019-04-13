export function getStaffJobDetails(data){
	return{
		type:"GETSTAFFJOBDETAILS",
		payload:data,
	}
}

export function deleteStaffJobs(data){
	return {
		type:'DELETESTAFFJOBS',
		payload:data,
	}
}
