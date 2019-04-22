const express = require('express');
var bodyParser = require('body-parser');
const mysql = require('mysql');
var multer = require('multer');
var md5 = require('md5');
var upload = multer();

const formidable = require('express-formidable');
const fs = require('fs');


var app = express();
//app.use(formidable());
const router = express.Router();
var md5 = require('md5');

//router.use(formidable());
router.post('/',function(req,res){

	var con = mysql.createConnection({
		  host: "localhost",
		  user: "root",
		  password: "root",
		  database: "test"
		});

	con.connect(function(err) {
		  if (err) {
		  			console.log(err);
		  			res.send({success:false,msg:'Issue at conncting database'});
		  	}else{

		  		console.log(req.body)
		  		var oldPassword = md5(req.body.oldPassword)
		  		var newPassword = md5(req.body.newPassword)

		  		var data = {
		  			Pword : newPassword,
		  			start_date: new Date(),
		  			end_date: new Date('2038-01-19'),
		  		}
		  		console.log(`select * from user Pword = "${oldPassword}" and userid = "${ req.body.userid}"`)
		  	con.query(`select Pword from user where userid = "${ req.body.userid}"` , function(err,result){
		  		console.log(result)
		  		if(result != undefined){

		  			if (result[0].Pword == oldPassword){
		  				con.query(`update user set ? where Pword = "${oldPassword}" and userid = "${ req.body.userid}"`, data ,function(err,result){
				  			if(err){
				  			console.log(err)
				  			res.send({success:false,msg:'Invalid Current Password'});
				  			con.end();
				  			}else{
				  			console.log(result)
				  			res.send({success:true,msg:'Details Updated'})
				  			
		  					}
		  				})

		  			}else{
		  				res.send({success:false,msg:'Invalid Password'});
		  				con.end();
		  			}


		  			
		  		}else{
		  			res.send({success:false,msg:'Invalid Password'});
		  			con.end();
		  		}

		  	})
		  		
		  	
			
	  	}

	  })
		   

})

module.exports = router;