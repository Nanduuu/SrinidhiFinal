const express = require('express');
var bodyParser = require('body-parser');
const mysql = require('mysql');
var multer = require('multer');
var upload = multer();
const app = express();
const router = express.Router();

var jwt = require('jsonwebtoken');

router.post('/',function(req,res){
				var clientId;
				let sql_getuserDetails = 'SELECT Emailid , Fname, Lname, Tel, Userid, stafftype, start_date, end_date from user where role = "staff";';
				

				req.db.query(sql_getuserDetails,function(err,result){

					if(err){
						res.send({success:false,msg:"Issue with database"});
					}else{
									console.log(result);
									res.send({success:true,userDetails:result});
								}
						})
					}
	
)
module.exports = router; 