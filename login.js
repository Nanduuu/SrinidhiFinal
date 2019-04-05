const express = require('express');
var bodyParser = require('body-parser');
const mysql = require('mysql');
var multer = require('multer');
var upload = multer();
const app = express();
const router = express.Router();
var md5 = require('md5');
var jwt = require('jsonwebtoken');

router.post('/', function(req,res){
		var con = mysql.createConnection({
		  host: "localhost",
		  user: "root",
		  password: "root",
		  database: "test"
		});
		var encrypt = md5(req.body.Data.pword);

		con.connect(function(err) {
		  if (err) {
		  			console.log(err);
		  			res.send({success:false,msg:'Issue at conncting database'});
		  	}else{
		  		console.log(req.body);
		  		 

 				var sql = "select Emailid, Fname, Lname,  Tel, Role, stafftype, userid ,end_date from user where Emailid = '" + req.body.Data.email + "' AND Pword = '" + encrypt + "';";							
		  		 con.query(sql, function(error,result,fields){
		  			//console.log(err);
		  			//console.log(result);
		  			if(error){
		  					console.log(error)
		  					con.end();
		  					res.send({success:false, msg:"Issue at database"});
		  				}
		  				
		  			else{
		  				con.end();
		  				console.log(result);
		  				//console.log(fields);
		  				if (result.length === 0){
		  					res.send({success:false,msg:"Authentication failed"});
		  				}else{
		  					console.log(result[0]);
		  					console.log(new Date(result[0].end_date) < new Date('2038-01-19') )
		  					if(new Date(result[0].end_date) > new Date() ){

		  					const token = jwt.sign({
		  						"Emailid":result[0].Emailid,
		  						"Fname" : result[0].Fname,
		  						"Lname" : result[0].Lname,
		  						"Role" : result[0].Role,
		  						"Tel"   : result[0].Tel,
		  						"Stafftype" : result[0].stafftype,
		  						"UserId" : result[0].userid,
		  						"start_date":new Date(),
		  						"end_date":new Date('9999-12-31')

		  					}, 'secretKey');
		  				
		  					res.send({success:true,
		  							  "Emailid" : result[0].Emailid,
		  							  "Fname" : result[0].Fname,
		  							  "Lname" : result[0].Lname,
		  							  "Tel"   : result[0].Tel,
		  							   "Role" :result[0].Role,
		  							   "Stafftype" : result[0].stafftype,
		  							   "UserId" : result[0].userid,
		  							   "Token" : token	});

		  					}else{

		  							res.send({success:false,msg:"User is locked"});

		  					}

		  					
		  				}
		  				
		  			}
		  			
		  		})
	
		  	}
		   });
})


module.exports = router;