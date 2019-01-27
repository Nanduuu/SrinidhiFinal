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
				res.send({success:false,msg:"Issue with database"});
			}else{
					var date = new Date(req.body.Data.date);
					date.setDate(date.getDate() + 1);
					console.log(date)

					let data  = {
								'worker' : req.body.Data.staff,
					  			'client' : req.body.Data.client,
					  			'date' : date,
					  			'start_time' : req.body.Data.from_time_string,
					  			'end_time' : req.body.Data.to_time_string,
					  			'count' :req.body.Data.count,
							 }
				console.log(data);
				var sql = "update jobs SET ? where jobid = " + req.body.Data.jobid + ";" ;
				con.query(sql,data,function(err,result){
					console.log(result);
					if(err){
						res.send({success:false,msg:"Please submit proper details."});
					}else{
						res.send({success:true,msg:"Job has been updated."});
					}
				})
			}
		})
})
module.exports = router; 