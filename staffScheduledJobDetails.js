const express = require('express');
var bodyParser = require('body-parser');
const mysql = require('mysql');
var multer = require('multer');
var upload = multer();
const app = express();
const router = express.Router();

var jwt = require('jsonwebtoken');

router.post('/',function(req,res){
	
		var con = mysql.createConnection({
		  host: "localhost",
		  user: "root",
		  password: "root",
		  database: "test"
		});
		con.connect(function(err){
			if(err){
				res.send({success:false,message:"Issue with database"});
			}else{
				var sql = `select userjobs.jobid , userjobs.from_time, userjobs.to_time, userjobs.date, jobs.client from userjobs left outer join jobs on userjobs.jobid = jobs.jobid  where userjobs.userid = "${req.body.Data.userid}";`
				con.query(sql,function(err,result){
					if(err){
						console.log(err);
					
						res.send({success:false,message:"Please enter proper date format : YYYY-MM-DD"});
					}else{

						console.log(result);
				
						res.send({success:true,jobs:result});
					}
					
				})
			}
		})
})
module.exports = router; 