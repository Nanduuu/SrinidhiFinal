function setSix(item){
	
	return function(value){
		return item + value
	}
	
}


var addSix = setSix(100);


console.log(addSix(20));