const express = require('express');
var bodyParser = require('body-parser');
const mysql = require('mysql');
var multer = require('multer');
var nodemailer = require('nodemailer');
var upload = multer();

const formidable = require('express-formidable');
const fs = require('fs');

var transporter = nodemailer.createTransport({
 
	service: 'yahoo',
  
   auth: {
    user: 'cambridgecareservices@yahoo.com',
    pass: 'Password@yahoo.com',
  }
});

var mailOptions = {
	from: 'cambridgecareservices@yahoo.com',
	to: 'venkatesh.ranganath@cambridgecasreservice.co.uk,nandakumarvn01@gmail.com',
	subject: 'New account has been created - Plz enable user',
	html : '<a href="http://35.154.35.118/">Click here to enable user </a>',
				

}; 

var app = express();
app.use(formidable());
const router = express.Router();
var md5 = require('md5');

router.use(formidable());
router.post('/',function(req,res){

	var con = mysql.createConnection({
		  host: "localhost",
		  user: "root",
		  password: "root",
		  database: "test"
		});

			console.log(req.fields)
			var  encrypt = md5(req.fields.Pword);
			console.log(md5(req.fields.Pword));

		con.connect(function(err) {
		  if (err) {
		  			console.log(err);
		  			res.send({success:false,msg:'Issue at conncting database'});
		  	}else{
		  		console.log(req.body);
		  		var sql_max = 'select max(userid) as max from user;';
		  		var userid;
		  		con.query(sql_max,function(err,result){
		  			if(err){
						res.send({success:false,message:"Issue with database"});
					}
					if(result[0].max === null){
						userid = 1;
					}else{
						userid = result[0].max + 1;
					}
					var sql = 'insert into user (Emailid, Fname, Lname, Tel, Pword, role,userid, stafftype) values' +
		  		 			'("'+ req.fields.Email +'","' +req.fields.Fname +'","'+ req.fields.Lname +'","'+req.fields.Tel +'","'+ encrypt +'","'+ "staff"+ '",' + userid + ',"' + req.fields.Stafftype + '")';

		  		 	con.query(sql, function(err,result){
		  			console.log(err);
		  			console.log(result);
		  			if(err){
		  				if(err.code === 'ER_DUP_ENTRY'){
		  					con.end();
		  					res.send({success:false, msg:"Email Id already exists"});
		  				}else{
		  					con.end();
		  					res.send({success:false, msg:"Issue with database"});
		  				}
		  				
		  			}else {
		  				if(result){
						  con.end();
						  transporter.sendMail(mailOptions, function(error, info){
									if (error) {
										console.log(error);
									} else {
										console.log('Email sent: ' + info.response);
									}
		 	 			 })
						  res.send({success:true,msg:"User regestration successful"});
						  
		  			}
		  			}
		  		})
		  		})
	  	}
		   });

})

module.exports = router;