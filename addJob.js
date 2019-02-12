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
		var date = new Date(req.body.Data.date);
		date.setDate(date.getDate() + 1);
		console.log(date)
		let data  = {
					  			'jobid' : null,
					  			'worker' : req.body.Data.staff,
					  			'client' : req.body.Data.client,
					  			'date' : date,
					  			'shift_id' :req.body.Data.shift_id,
					  			'count' :req.body.Data.count,
					  			'filled':0,
					  			'active':'Y'
					 }
				console.log(data);
				var sql_max = 'select max(jobid) as max from jobs;';
				var sql_insert = 'INSERT INTO jobs SET ?';

				req.db.query(sql_max,function(err,result){
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
						req.db.query(sql_insert,data,function(err,result){
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
								
							res.send({success:true,msg:"Job added Successfully"});
						}
				})
				});
			
	
})
module.exports = router; 