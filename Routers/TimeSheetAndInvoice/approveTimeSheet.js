const express = require('express');
var bodyParser = require('body-parser');
const mysql = require('mysql');
var multer = require('multer');
var upload = multer();
const app = express();
const router = express.Router();

var jwt = require('jsonwebtoken');

router.post('/',function(req,res){
	
		
				if(req.body.Data.flag == 'Y'){
					var sql = `update facttable set flag = 'N'  where jobid = ${req.body.Data.jobid} and userid = ${req.body.Data.userid};`
				}else{
					var sql = `update facttable set flag = 'Y'  where jobid = ${req.body.Data.jobid} and userid = ${req.body.Data.userid};`
				}

				
				req.db.query(sql,function(err,result){
					console.log(result);
					if(err){
						res.send({success:false,msg:"Failed to update"});
					}else{
						res.send({success:true,job:result});
					}
				})
			}
		
)
module.exports = router; 