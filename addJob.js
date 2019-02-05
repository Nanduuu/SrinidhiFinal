const express = require('express');
var bodyParser = require('body-parser');
const mysql = require('mysql');
var multer = require('multer');
var upload = multer();
const app = express();
const email = require('./email');
const router = express.Router();

var jwt = require('jsonwebtoken');

router.post('/',function(req,res){
		var con = mysql.createConnection({
		  host: "localhost",
		  user: "root",
		  password: "root",
		  database: "test"
		});

		var date = new Date(req.body.Data.date);
		date.setDate(date.getDate() + 1);
		console.log(date)
		let data  = {
					  			'jobid' : null,
					  			'worker' : req.body.Data.staff,
					  			'client' : req.body.Data.client,
					  			'date' : date,
					  			'start_time' : req.body.Data.from_time_string,
					  			'end_time' : req.body.Data.to_time_string,
					  			'count' :req.body.Data.count,
					  			'filled':0
					 }
		console.log(data);
		con.connect(function(err){
			if(err){
				res.send({success:false,message:"Issue with database"});
			}else{
				var sql_max = 'select max(jobid) as max from jobs;';
				var sql_insert = 'INSERT INTO jobs SET ?';

				con.query(sql_max,function(err,result){
					if(err){
						res.send({success:false,message:"Issue with database"});
					}
						console.log("max",result[0].max)
					if(result[0].max === null){
						data.jobid = 1;
					}else{
						data.jobid = result[0].max + 1;
					}
					console.log(data);
					con.query(sql_insert,data,function(err,result){
					if(err){ 
						console.log(err);
						if(err.code === 'ER_DUP_ENTRY'){
							con.end();
							res.send({success:false, msg:"Duplicate Entry"});
							}else{
								con.end();
								res.send({success:false, msg:"Issue with database"});
								}
							}else {
								
								var emailData = {};
								var toList_sql = 'select Emailid from user where stafftype = "' + req.body.Data.staff +'";';
								con.query(toList_sql,function(err,result){
										if(err){

										}
										var emailData = {};
										emailData.toList = result.map((item)=>{
											return item.Emailid
										}).toString(",");
										
										console.log(toList_sql);
										emailData.info = {
											hospital : req.body.Data.client,
												date : req.body.Data.date,
												from_time : req.body.Data.from_time_string,
												to_time : req.body.Data.to_time_string,
										}
										email.sendEmail(emailData);
										console.log(emailData);
										con.end();
								})
								res.send({success:true,msg:"Job added Successfully"});
						}
				})
				});
			}
		})
})
module.exports = router; 