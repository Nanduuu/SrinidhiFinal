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
				console.log(req.body.Data);
				//var sql = `delete from client where (ct_branch) in (${req.body.Data}) ;`
				var sql = 'delete from client where (ct_branch) in ("' + req.body.Data.join('","') + '");';
				console.log(sql)
				con.query(sql,function(err,result){
					console.log(result)
					if(err){
						con.end();
						res.send({success:false,message:"Please enter proper Job ids"});
					}else{
						con.end();
						console.log(result);
						res.send({success:true,message:result});
					}
				})
			}
		})
})
module.exports = router; 