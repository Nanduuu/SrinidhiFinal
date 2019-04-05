const express = require('express');
var bodyParser = require('body-parser');
const mysql = require('mysql');
var multer = require('multer');
var upload = multer();
const app = express();
const router = express.Router();

var jwt = require('jsonwebtoken');

router.post('/',function(req,res){
				console.log(req)
				
				var current_date = new Date(req.body.Data.end_date);
				var end_date = new Date('2038-01-19');

				console.log(new Date());
				console.log(end_date);

				var data = {};

				if (current_date < end_date){

					
					data.end_date = new Date('2038-01-19');
					

				}else{
					
						data.end_date = new Date( );
					
				}
				
				console.log(data);
				let sql_updateUserDetails = `UPDATE user  SET ? where Userid = ${req.body.Data.Userid};`;
				

				req.db.query(sql_updateUserDetails, data,function(err,result){
					console.log(err);

					if(err){
						res.send({success:false,msg:"Issue with database"});
					}else{
									console.log(result);
									res.send({success:true,msg:"Successfully updated"});
								}
						})
					}
	
)
module.exports = router; 