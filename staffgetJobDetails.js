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

				let curr_date = new Date().toISOString();
				//var sql = `select * from jobs left join shifts on jobs.shift_id = shifts.shift_id where date >= "${req.body.Data.from_date}" and date <= "${req.body.Data.to_date}" and jobs.shift_id = shifts.shift_id ;`
				var sql = `select * from jobs where date >= "${curr_date}" and date <= "${req.body.Data.to_date}"  and worker = "${req.body.Data.stafftype}";`
				con.query(sql,function(err,result){
					//console.log(sql)
					if(err){
						console.log(err);
						con.end();
						res.send({success:false,message:"Please enter proper date format : YYYY-MM-DD"});
					}else{

						console.log(result);
						con.end();
						res.send({success:true,jobs:result});
					}
					
				})
			}
		})
})
module.exports = router; 