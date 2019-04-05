 export function getUserDetails(){
 	return {
 		type:"GETUSERDETAILS",
 	}
 }


 export function enable_disable_user(data){
 	return{
 		type:"ENABLEDISABLEUSER",
 		payload:data,
 	}
 }