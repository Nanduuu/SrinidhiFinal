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

	var mailOptions = {
	  	from: 'notify@cambridgecareservices.co.uk',
	  	to: data.toList,
	  	subject: 'Job notification from Cambridge Care Services',
	  	html: 		'<style> table { border-collapse: collapse;	} table, td, th { border: 1px solid black;} </style>' +
	  		 		'<h3>Below is the job details </h3>' +
	  		 		'<table style= "border: 1px solid black;">'+
	  		 		'<td> Hospital </td>' +
	  		 		'<td> Date </td>' +
	  		 		'<td> Start Time </td>' +
	  		 		'<td> End Time </td>' +
	  				'<tr >' + 
	  					'<td >' + data.info.hospital + '</td>' +
	  					'<td >' + data.info.date + '</td>' +
	  					'<td >' + data.info.from_time + '</td>' +
	  					'<td > '+ data.info.to_time  + '</td> '+
	  				'</tr>' +
	  				'</table> </br>'+
	  				'<a href="http://35.154.35.118/">Click here to accept job </a>'
	  
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