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
			
				var sql = 'select * from staffinvoice;';
				req.db.query(sql,function(err,result){
					console.log(result)
					if(err){
						res.send({success:false,msg:'Error with database'});
					}

					res.send({success:true,staffInvoiceRates:result});
				})
			
		
})
module.exports = router; 