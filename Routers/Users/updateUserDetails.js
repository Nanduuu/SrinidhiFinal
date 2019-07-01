const express = require('express');
var bodyParser = require('body-parser');
const mysql = require('mysql');
var multer = require('multer');
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

		  		var data = {
		  			Emailid : req.body.Email,
		  			Fname : req.body.Fname,
		  			Lname : req.body.Lname,
		  			Tel :req.body.Tel,
		  			start_date: new Date(),
		  			end_date: new Date('2038-01-19'),
		  		}
		  		
		  	con.query(`update user set ? where userid = "${req.body.userid}"`, data ,function(err,result){
		  		if(err){
		  			console.log(err)
		  			res.send({success:false,msg:'Issue at conncting database'});
		  		}else{
		  			res.send({success:true,msg:'Details Updated'})
		  			con.end();
		  		}
		  	})
			
	  	}

	  })
		   

})

module.exports = router;