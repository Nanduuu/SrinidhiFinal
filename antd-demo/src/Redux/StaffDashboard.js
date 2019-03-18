const initialState = {

	staffConfirmJob_status:false,
	staffConfirmJob_msg:"",
	staffScheduledJobs : null,
}

function UTC_IST(date){

	var dateUTC = new Date(date);
	var dateUTC = dateUTC.getTime() 
	var dateIST = new Date(dateUTC);
			//date shifting for IST timezone (+5 hours and 30 minutes)
	dateIST.setHours(dateIST.getHours() + 5); 
	dateIST.setMinutes(dateIST.getMinutes() + 30);
	console.log(dateIST)
	return dateIST.toISOString();

}

export function StaffDashboard( state = initialState, action){

	switch(action.type){
		case "STAFF_CONFIRM_JOB" :
			return Object.assign(
            {},
            state,
            {
                staffConfirmJob_status:action.success,
				staffConfirmJob_msg:action.msg,
            }
          )
        break;
        case "STAFF_SCHEDULED_JOBS" :
        	var jobs = action.jobs;
                var data = [];
                 if(jobs.length != 0){
                   for (var i = 0 ; i <= jobs.length - 1; i++){

                   		
						data.push({
                            'key' : jobs[i].jobid,
                            'jobid' : jobs[i].jobid,
                            'client': jobs[i].client,
                            'date' :  UTC_IST(jobs[i].date).slice(0,10),
                            'from_time' : UTC_IST(jobs[i].from_time),
                            'to_time':UTC_IST(jobs[i].to_time),
                           
                       })
                 }
                 }  
			return Object.assign(
            {},
            state,
            {
                staffScheduledJobs :data,
            }
          )
        break;
		default:
		return state;
	}
}