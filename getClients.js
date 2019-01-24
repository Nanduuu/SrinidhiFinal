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
				var sql = 'select ct_branch from client;';
				con.query(sql,function(err,result){
					console.log(result)
					res.send({success:true,clients:result});
				})
			}
		})
})
module.exports = router; 