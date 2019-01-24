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
		  		 

 				var sql = "select Emailid, Fname, Lname,  Tel, Role from user where Emailid = '" + req.body.Data.email + "' AND Pword = '" + encrypt + "';";							
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
		  					res.send({success:false,msg:"User doesnot exists"});
		  				}else{
		  					//console.log(result[0].Fname);
		  					const token = jwt.sign({
		  						"Emailid":result[0].Emailid,
		  						"Fname" : result[0].Fname,
		  						"Role" : result[0].Role

		  					}, 'secretKey');
		  					console.log(token);
		  					res.send({success:true,
		  							  "Emailid" : result[0].Emailid,
		  							  "Fname" : result[0].Fname,
		  							  "Lname" : result[0].Lname,
		  							  "Tel"   : result[0].Tel,
		  							   "Role" :result[0].Role,
		  							   "Token" : token	});
		  				}
		  				
		  			}
		  			
		  		})
	
		  	}
		   });
})


module.exports = router;