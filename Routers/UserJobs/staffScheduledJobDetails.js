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

		let start_date = new Date(req.body.Data.from_date).toISOString();
		let end_date = new Date (req.body.Data.to_date).toISOString();

		console.log(req.body.Data.from_date)
		console.log(req.body.Data.to_date)
		console.log(req.body.Data.userid)
		console.log(start_date)
		console.log(end_date)

		con.connect(function(err){
			if(err){
				res.send({success:false,message:"Issue with database"});
			}else{
				var sql = `select jobs.jobid , jobs.start_time, jobs.end_time, jobs.date, jobs.client from jobs LEFT JOIN  userjobs on  userjobs.jobid = jobs.jobid where userjobs.userid = "${req.body.Data.userid}" and jobs.date >= "${ start_date}" and jobs.date <= "${end_date}";`
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