const express = require('express');
var bodyParser = require('body-parser');
const mysql = require('mysql');
var multer = require('multer');
var upload = multer();
const app = express();
const router = express.Router();

var jwt = require('jsonwebtoken'); 

var con = mysql.createConnection({
					  host: "localhost",
					  user: "root",
					  password: "root",
					  database: "test",
					  multiplequeries: 'true',
					});
			
			con.connect(function(err) {
				console.log(err);

			});

router.post('/',function(req,res){
				let data  = {
					  			'jobid' : req.body.Data.JobID,
					  			'userid': req.body.Data.UserId, 
					  			'start_time' : new Date( req.body.Data.start_time),
					  			'end_time' : new Date( req.body.Data.end_time),
					  			'date' : new Date(req.body.Data.Date),
						 }
				
				var get_locks = 'lock tables userjobs write, jobs write ;';

				var release_lockes = 'UNLOCK TABLES;';
				var flag = true;
 
				con.query(get_locks, function (err,result){
					if(err){
						console.log('in error at locks')
						console.log(err);
					}else{
						con.query('select connection_id()',function(err,result){
						console.log(result);

							var check_availability = `select * from jobs where filled = count and jobid = "${req.body.Data.JobID}";`

							con.query(check_availability, function(err,result){

 
							if (err ){
								con.query(release_lockes, function(err,result){

											if(err){
												console.log(err)
											}
										});
								//con.end();
						
								res.send({success:false,msg:"No availability"}); 
						
							}else if(result.length > 0){ 
								console.log(result);
								con.query(release_lockes, function(err,result){
													if(err){
														console.log(err)
													}
												});
								//con.end();
							
								res.send({success:false,msg:"No availability"}); 
								
								flag = false;
								}else{
									var sql_dup = 'select * from userjobs where jobid = "' + req.body.Data.JobID +'" and userid = "' + req.body.Data.UserId + '";'

							  		var sql_conflict = `select * from userjobs  where end_time >= "${req.body.Data.start_time}" and end_time <= "${req.body.Data.end_time}" and userid = ${req.body.Data.UserId} ;`// "${req.body.Data.end_time}";`
							
									


									con.query( sql_conflict,function(err,result){
					
					if( result.length !== 0 ){
							con.query(release_lockes,function(err,result){
								if(err){
									console.log(err);
								}
							});
							con.end();
							res.send({success:false,msg:"Time Conflict"});
					}else{

						con.query(sql_dup, function(err,result){
							if (result.length !== 0){ 
									con.query(release_lockes,function(err,result){

									})
									con.end();
									res.send({success:false,msg:"User alreday enrolled to this job"});
							}else{

									var sqlInsertJob = `INSERT INTO userjobs SET ? ;`;

									con.query(sqlInsertJob,data,function(err,result){ 
									console.log("In Insert query")
									console.log(err);
									if (err){
										con.query(release_lockes, function(err,result){
											if(err){
												console.log(err)
											}
										});
										con.query('ROLLBACK',function(err,result){

										});
										con.end();
										res.send({success:false,msg:"Database error"});
									}else{
										con.query(`update jobs set filled = filled+1 where jobid = "${req.body.Data.JobID}";`,function(err,result){

										})
										con.query('commit', function(err,result){

										});

										con.query(release_lockes, function(err,result){
											if(err){
												console.log(err);
											}
										});
										con.end();
										res.send({success:true,msg:"Enrolled Successfully"});
									}
								})
							}
						})
					}
					
			})
		}
	})


					});
					}
					
				})

				
					
})

	//con.end();

module.exports = router; 



