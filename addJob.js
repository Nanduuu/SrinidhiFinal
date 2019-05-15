const express = require('express');
var bodyParser = require('body-parser');
const moment = require('moment');
const mysql = require('mysql');
var multer = require('multer');
var upload = multer();
const app = express();
const email = require('./email');
const router = express.Router();

var jwt = require('jsonwebtoken');


function getActiveUsers (staffType){

	let myPromise = new Promise(function(resolve, reject){
  			var con = mysql.createConnection({
					  host: "localhost",
					  user: "root",
					  password: "root",
					  database: "test"
					});
	 		con.connect(function(err) {
					  if (err) {
					  			throw err;
					  			res.send({success:false,msg:'Issue at conncting database'});
					  	}
			})

	 		con.query(`select Emailid from user where stafftype = "${staffType}" and end_date > "${new Date().toISOString()}";`, function(err,result){
	 			if(err){
	 				console.log(err);
	 				reject('Issue with database');
	 			}else{

	 				con.end();
	 				 resolve(resolve);
	 			}
	 		})

	})

	return myPromise;

}



router.post('/',function(req,res){
		
		
		let data  = {
					  			'jobid' : null,
					  			'worker' : req.body.Data.staff,
					  			'client' : req.body.Data.client,
					  			'date' : new Date(req.body.Data.date),
					  			'shift_id' :req.body.Data.shift_id,
					  			'count' :req.body.Data.count,
					  			 start_time:null,
					  			 end_time:null,
					  			'filled':0,
					  			'active':'Y'
					 }
				var sql_shiftdata = `select * from shifts where shift_id = "${req.body.Data.shift_id}"`;
				var sql_max = 'select max(jobid) as max from jobs;';
				var sql_insert = 'INSERT INTO jobs SET ?';

		req.db.query(sql_shiftdata, function(err,result){
				if(err){
					res.send({success:false,msg:"Issue with database"});
				}else{

					var start_time = new Date( req.body.Data.date.slice(0,10)+ ' '+result[0].start_time );
					var end_time  = new Date( req.body.Data.date.slice(0,10)+ ' '+result[0].end_time );

					console.log(start_time);
					console.log(end_time);

					if (start_time > end_time){

						var diff = end_time - start_time;   
						//console.log(diff)
						//to_date = to_date.getTime();
						var  final = start_time.getTime() + diff + 86400000;
						end_time = new Date(final)
						data.start_time = start_time;
						data.end_time = end_time;
						data.shift_type = result[0].shift_type;
					}else{
						data.start_time = start_time;
						data.end_time = end_time;
						data.shift_type = result[0].shift_type;
					}
					req.db.query(sql_max,function(err,result){
					if(err){
						res.send({success:false,message:"Issue with database"});
					}
						
						if(result[0].max === null){
							data.jobid = 1;
						}else{
							data.jobid = result[0].max + 1;
						}
					
						req.db.query(sql_insert,data,function(err,result){
					if(err){ 
						console.log(err);
						if(err.code === 'ER_DUP_ENTRY'){
						
							res.send({success:false, msg:"Duplicate Entry"});
							}else{
								
								res.send({success:false, msg:"Issue with database"});
								}
							}else {

								let emailData = {};

								getActiveUsers(req.body.Data.staff).then(function(result){

									if(result){

										var info = {
											hospital : req.body.Data.client,
	  										date : req.body.Data.date,
	  										from_time : start_time,
	  										to_time  : end_time,
										}

										let emailData = {

											info,
											toList : 'nandakumarvn01@gmail.com',

										}

										email.sendEmail(emailData);
									}

								}).catch(function(err){
									console.log(err);
								})
								
							res.send({success:true,msg:"Job added Successfully"});
						}
					})
				});
			}
		})
})
module.exports = router; 