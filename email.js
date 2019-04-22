var nodemailer = require('nodemailer');


var transporter = nodemailer.createTransport({
  host: 'smtp.ionos.co.uk',
  secure:false,
  auth: {
    user: 'notify@cambridgecareservices.co.uk',
    pass: 'Cambridge1!',
  }
});

function sendEmail( data ){


	var html = '<style> table { border-collapse: collapse;	} table, td, th { border: 1px solid black;} </style>' +
	  		 		'<h3>Below is the job details </h3>' +
	  		 		'<table style= "border: 1px solid black;">'+
	  		 		'<td> Hospital </td>' +
	  		 		'<td> Date </td>' +
	  		 		'<td> Start Time </td>' +
	  		 		'<td> End Time </td>' ;

	  if(Array.isArray(data.info) == Array){
	  	   for(let i = 0; i < data.info.length ; i++){
	  	   	html += '<tr >' + 
	  					'<td >' + data.info[i].hospital + '</td>' +
	  					'<td >' + data.info[i].date + '</td>' +
	  					'<td >' + data.info[i].from_time + '</td>' +
	  					'<td > '+ data.info[i].to_time  + '</td> '+
	  				'</tr>';

	  	   }

	  	   html += '</table> </br>'+
	  				'<a href="http://35.154.35.118/">Click here to accept job </a>';
	  }else{
	  			html += '<tr >' + 
	  					'<td >' + data.info.hospital + '</td>' +
	  					'<td >' + data.info.date + '</td>' +
	  					'<td >' + data.info.from_time + '</td>' +
	  					'<td > '+ data.info.to_time  + '</td> '+
	  				'</tr>';
	  		    html += '</table> </br>'+
	  				'<a href="http://35.154.35.118/">Click here to accept job </a>';
	  }

	var mailOptions = {
	  	from: 'notify@cambridgecareservices.co.uk',
	  	to: data.toList,
	  	subject: 'Job notification from Cambridge Care Services' + data.info.hospital,
	  	html,
	  				
	  
	}; 


	transporter.sendMail(mailOptions, function(error, info){
  				if (error) {
  			  		console.log(error);
  				} else {
   				 	console.log('Email sent: ' + info.response);
   				 
				}

	})
}
module.exports = {sendEmail : sendEmail}