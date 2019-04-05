
const initialState = {
		  addClientMsg : "",
          addClientSuccess : false,
          activeClients : [],
          inactiveClients:[],
          disableClientFlag : false,
          disableClientMsg : "",
          enableClientFlag : false,
          enableClientMsg:"",
          getEditClient : {},
          addShiftFlag : false,
          addShiftMsg:"",
          shiftDetails:[],

          updateClientMsg:"",
          updateClientFlag : false,

         
}


export  function ClientReducer( state = initialState, action){


	switch(action.type){

		case 'SET_ADD_CLIENT' :
        return Object.assign(
            {},
            state,
            {
              addClientSuccess : false,
              addClientMsg : "",
            }
          )
        break;
        case 'BEGIN_ADD_CLIENT' :
       return Object.assign(
        {},
        state,
        {
           addClientMsg:"",
        }

        ) 
      break;
      case 'RESET_ADD_CLIENT' :
        return Object.assign(
            {},
            state,
            {
              
              addClientSuccess : action.success,
              addClientMsg : action.msg,
              
            }
          )
        break;
       case "SET_ACTIVE_CLIENTS" : 
      return Object.assign(
        {},
        state,
        {
            activeClients:action.clients,
        })
        break;
        case "SET_INACTIVE_CLIENTS" : 
	      return Object.assign(
	        {},
	        state,
	        {
	            inactiveClients:action.clients,
	        })
        break;
        case "SET_DISABLE_CLIENT" : 
        	return	Object.assign(
        		{},
        		state,
        		{
        			disableClientFlag : action.success,
        			disableClientMsg : action.msg,
        		}
        		)
        	
         break;
         case "RESET_DISABLE_CLIENT" : 
        	return	Object.assign(
        		{},
        		state,
        		{
        			disableClientFlag : false,
        			disableClientMsg : "",
        		}
        		)
        	break;
        case "SET_ENABLE_CLIENT" : 
        	return	Object.assign(
        		{},
        		state,
        		{
        			disableClientFlag : action.success,
        			disableClientMsg : action.msg,
        		}
        		)
        	
         break;
         case "RESET_ENABLE_CLIENT" : 
        	return	Object.assign(
        		{},
        		state,
        		{
        			enableClientFlag : false,
        			enableClientMsg : "",
        		}
        		)
        	break;
        case "SET_EDIT_CLIENT" : 

          console.log(action.getEditClient);
        	return	Object.assign(
        		{},
        		state,
        		{
        			getEditClient:{...action.data},
        			updateClientFlag : false,
              updateClientMsg:"",
        		}
        		)
        	break;
          case "RESET_EDIT_CLIENT" :

          return Object.assign(
          {},
          state,
          {
              updateClientFlag : action.flag,
              updateClientMsg : action.msg,
          }
          )
          case "RESET_ADDSHIFT" :

          return Object.assign(
          {},
          state,
          {
              addShiftFlag : action.flag,
              addShiftMsg : action.msg,
          }
          )
          case "SET_SHIFT_DETAILS" :

          return Object.assign(
          {},
          state,
          {
              shiftDetails:action.shiftDetails,
          }
          )
    

            
	}

	return state;

} 