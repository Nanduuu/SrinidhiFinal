import axios from 'axios';
import  jwtDecode from 'jwt-decode';

export  default function setAuthJwt(token){
	
	if(token){
			axios.defaults.headers.common['Authorization'] = 'Bearer ${token}';
			var decode = jwtDecode(token);
			//console.log(decode);
			

	}else{
			delete axios.defaults.headers.common['Authorization'];
	}
}

