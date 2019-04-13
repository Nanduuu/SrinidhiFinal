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
				console.log(req.body);
				var sql = 'delete from jobs where (jobid) in ("' + req.body.Data.join('","') + '");';
				con.query(sql,function(err,result){
					console.log(result)
					if(err){
						con.end();
						res.send({success:false,message:"Please enter proper Job ids"});
					}else{

						con.query('delete from userjobs where (jobid) in ("' + req.body.Data.join('","') + '");' , function(err,result){

							con.end();
							res.send({success:true,message:result});
						})
						
					}
				})
			}
		})
})
module.exports = router; 