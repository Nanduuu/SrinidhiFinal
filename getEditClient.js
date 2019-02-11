const express = require('express');
var bodyParser = require('body-parser');
const mysql = require('mysql');
var multer = require('multer');
var upload = multer();
const app = express();
const router = express.Router();

var jwt = require('jsonwebtoken');

router.post('/',function(req,res){
				console.log()
				var sql = 'select * from client where ct_name = "' +  req.body.Data +'";';
				req.db.query(sql,function(err,result){
					console.log(result)
					res.send({success:true,getEditClient:result[0]});
				})
			
		
})
module.exports = router; 