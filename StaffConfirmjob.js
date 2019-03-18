const express = require('express');
var bodyParser = require('body-parser');
const mysql = require('mysql');
var multer = require('multer');
var upload = multer();
const app = express();
const router = express.Router();

var jwt = require('jsonwebtoken'); 

router.post('/',function(req,res){
				console.log("In staff confirm job")
				console.log(req.body.Data)
				var from_time = new Date(req.body.Data.Date +' ' +req.body.Data.from_time );
				var to_time = new Date(req.body.Data.Date +' ' +req.body.Data.to_time );
				var date = new Date(req.body.Data.date );
				let data  = {
					  			'jobid' : req.body.Data.JobID,
					  			'userid':req.body.Data.UserId,
					  			'from_time' : from_time,
					  			'to_time' : to_time,
					  			'date' : req.body.Data.Date,
						 }
				console.log(data);
				if(data.from_time > data.to_time){
					console.log("Change date");
				}

				var sql_dup = 'select * from userjobs where jobid = "' +  req.body.Data.JobID +'" and userid = "' + req.body.Data.UserId + '";'
				var sql_conflict = 'select * from userjobs where DATE(date) = "'+ date +'" and  to_time between "'+ from_time +'" and "'+to_time+'";'

				req.db.query(sql_dup,function(err,result){
					
					if(result.length !== 0 ){
						console.log(result)
						console	.log("Job conflict")
						console.log(new Date(result[0].from_time).toISOString());
						res.send({success:false,msg:"User alreday enrolled this Job"});
					}else{

						req.db.query(sql_conflict, function(err,result){
							console.log(result);
							if (result.length !== 0 ){
								console.log(result);
								console	.log("time conflict")
								res.send({success:false,msg:"Date and Time conflict"});
							}else{
									var sqlInsertJob = 'INSERT INTO userjobs SET ? ;';
									req.db.query(sqlInsertJob,data,function(err,result){
									console.log("In Insert query")
									console.log(result);
									if (err){
										res.send({success:false,msg:"Database error"});
									}else{
										res.send({success:true,msg:"Enrolled Successfully"});
									}
								})
							}
						})

						
						

					}
					
				})
			
					
})
module.exports = router; 



