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
				var sql = `select * from jobs where date >= "${req.body.Data.from_date}" and date <= "${req.body.Data.to_date}" ;`
				con.query(sql,function(err,result){
					console.log(sql)
					if(err){
						con.end();
						res.send({success:false,message:"Please enter proper date format : YYYY-MM-DD"});
					}
					console.log(result);
					con.end();
					res.send({success:true,jobs:result});
				})
			}
		})
})
module.exports = router; 