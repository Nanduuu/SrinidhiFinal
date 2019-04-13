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


						let source_data = req.body.Data.jobs;
						

						let data = [];

						source_data.map(function(row){
							temp = {};
							temp.jobid = row;
							temp.userid = req.body.Data.userid;
							data.push(temp)
						})
						let count = data.length;

						for(let i = 0; i < count ; i++){

							let delete_sql = `delete from userjobs where jobid = ${data[i].jobid} and userid = ${data[i].userid};`;

							con.query(delete_sql, function(err,result){
								if(err){
									console.log(err);
									flag = false;
								}
							})
						}

						for(let i = 0; i < count ; i++){

							let count_sql= `update jobs set filled = filled-1 where jobid = "${data[i].jobid}";`
							con.query(count_sql, function(err,result){
								if(err){

									console.log(err)
									flag = false;
								}
							}) 

						}	
						
						
						con.end();
						res.send({success:true})

						
						
					}
				})

			})
module.exports = router; 