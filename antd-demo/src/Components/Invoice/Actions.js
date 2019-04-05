
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