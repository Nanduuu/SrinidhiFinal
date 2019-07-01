const express = require('express');
var bodyParser = require('body-parser');
const mysql = require('mysql');
var multer = require('multer');
var upload = multer();
const app = express();
const router = express.Router();

var jwt = require('jsonwebtoken');

router.post('/',function(req,res){
		console.log("active")
			
				var sql = 'select ct_name from client where ct_end_date = "9999-12-31";';
				req.db.query(sql,function(err,result){
					console.log(result)

					res.send({success:true,activeclients:result});
				})
			
		
})
module.exports = router; 