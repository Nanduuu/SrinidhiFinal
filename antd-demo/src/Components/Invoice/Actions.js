
export function getClientInvoiceRates( ){
	return{
		type : "GETCLIENTINOVICERATES"
	}
}


export function getStaffInvoiceRates( ){
	return{
		type : "GETSTAFFINOVICERATES"
	}
}


export function updateInvoiceRates( data){
	return{
		type : "UPDATEINVOICERATES",
		payload : data,
	}
}

export function getFactTableData(data){
	return{
		type:"GETFACTTABLEDATA",
		payload : data,
	}
}

export function approveTimeSheets(data){
	return{
		type: "APPROVETIMESHREET",
		payload : data,
	}
}