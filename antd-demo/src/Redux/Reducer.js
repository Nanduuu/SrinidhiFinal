
 const initialState = {
         	user:{},
         	isauthenticated:false,
         	authFailed:false,

          actions:{
            addclient : false,
          },

          
          clients:[],


          addJobflag:false,
          addJobMsg:"",

          jobDetails : [],
          staffjobDetails : [],

          job:{},

          editJobMsg : "",
          editJobFlag : false,

          

 
 };

 export function Reducer(state = initialState, action) {
  
  	switch(action.type){
  		case 'SET_CURRENT_USER' :
  			
  				return Object.assign(
  					
  					{},
  					state,
  					{
  						isauthenticated : true,
  						user: { 
  								Fname : action.user.Fname,
                  Lname : action.user.Lname,
                  Tel : action.user.Tel,
  								Email : action.user.Emailid,
  								Role : action.user.Role,
                  Stafftype : action.user.Stafftype,
                  UserId : action.user.UserId,
    						}
  					}
  				)
  			break;
  		case 'AUTH_ERROR':
  			return Object.assign(
  				{},
  				state,
  				{
  					authFailed:true,
  					user:{},
  					isauthenticated:false
  				}
  				)
  			break;

  		case 'RE_SET_CURRENT_USER' :
  				return Object.assign(
  					{},
  					state,
  					{
  						authFailed:false,
  						user:{},
  						isauthenticated:false
  					}

  					)

  		break;
      
      case "SET_ADD_JOB" :
         return Object.assign(
            {},
            state,
            {
              addJobflag : false,
              addJobMsg : "",
              
            }
          )
         break;
        case "RESET_ADD_JOB" : 
         return Object.assign(
            {},
            state,
            {
              addJobflag : action.success,
              addJobMsg : action.msg,
            }
          )
         break;
        case "SET_JOB_DETAILS" : 
                var details = action.jobDetails;
                var data = [];
                 if(details.length != 0){
                   for (var i = 0 ; i <= details.length - 1; i++){
                          data.push({
                            'key' : details[i].jobid,
                            'JobID' : details[i].jobid,
                            'Client': details[i].client,
                            'Date' : details[i].date.slice(0,10),
                            'Staff' : details[i].worker,
                            'from_time' : details[i].start_time,
                            'to_time': details[i].end_time,
                            'Requested' : details[i].count,
                            'Filled':details[i].filled,
                       })
                 }
                 }  
          return Object.assign(
              {},
              state,
              {
                jobDetails:data,
              }
            )
          break;

        case "SET_JOB" :
            var details = action.job;
            var data = {
                            'key' : details[0].jobid,
                            'JobID' : details[0].jobid,
                            'Client': details[0].client,
                            'Date' : details[0].date.slice(0,10),
                            'Staff' : details[0].worker,
                           // 'from_time' : details[0].start_time,
                            //'to_time': details[0].end_time,
                            'shift_id' :details[0].shift_id,
                            'Requested' : details[0].count,
                            'Availability':details[0].left,

            }
            return Object.assign(
              {},
              state,
              {
                job:data,
              }
            )

        break;

        case "SET_EDIT_JOB" :
            return Object.assign(
              {},
              state,
              {
                editJobMsg : action.msg,
                editJobFlag : action.success,
              }
            )
          break;

        case "RESET_EDIT_JOB" :
            return Object.assign(
              {},
              state,
              {
                editJobMsg : "",
                editJobFlag : false,
              }
            )
          break;
        case "SET_STAFF_JOB_DETAILS" : 
                console.log(action.jobs)
                var details = action.jobDetails;
                var data = [];
                 if(details.length != 0){
                   for (var i = 0 ; i <= details.length - 1; i++){
                          data.push({
                            'key' : details[i].jobid,
                            'JobID' : details[i].jobid,
                            'Client': details[i].client,
                            'Date' : details[i].date.slice(0,10),
                            'Staff' : details[i].worker,
                            'from_time' : details[i].start_time,
                            'to_time': details[i].end_time,
                            'Requested' : details[i].count,
                            'Availability':details[i].left,
                       })
                 }
                 }  
          return Object.assign(
              {},
              state,
              {
                staffjobDetails:data,
              }
            )
          break;
  	}

  return state

}
