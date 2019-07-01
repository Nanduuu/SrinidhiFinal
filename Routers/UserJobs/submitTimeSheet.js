const express = require('express');
const formidable = require('express-formidable');
const fs = require('fs');


var app = express();
app.use(formidable());
const router = express.Router();

router.use(formidable());

var jwt = require('jsonwebtoken');

router.post('/',function(req,res){
	

				console.log(req.fields); 
				console.log(req.files.ack)

				var data = req.fields;


				fs.rename(req.files.ack.path, __dirname+ '/acks/' + data.jobid + data.userid + req.files.ack.name, function(err){

					if(err){

					}else{

						var input = {
							remarks : data.remarks,
							ack_path: '/acks/' + data.jobid + data.userid + req.files.ack.name 
						}

						var sql = `update facttable set  ? where jobid = ${data.jobid} and userid = ${data.userid};`

						req.db.query(sql, input,function(err,result){
							if(err){
								res.send( {seccess:false,msg:"filed to upload ack" });
							}else{
								req.db.query('commit',function(err,result){
									res.send({success:true,msg:"Submitted sucessfully"});
								})
								
							}
						})
					}

				})
				
				
				

				
				// req.db.query(sql,function(err,result){
				// 	console.log(result);
				// 	if(err){
				// 		res.send({success:false,msg:"Failed to update"});
				// 	}else{
				// 		res.send({success:true,job:result});
				// 	}
				// })
			}
		
)
module.exports = router; 