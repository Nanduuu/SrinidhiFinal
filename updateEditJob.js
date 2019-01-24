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
				var sql = `update jobs SET ? where jobid = ${req.Data.jobid};`
				con.query(sql,function(err,result){
					console.log(result);
					if(err){
						res.send({success:false,msg:"Please submit proper details"});
					}else{
						res.send({success:true,msg:result});
					}
				})
			}
		})
})
module.exports = router; 