const express = require('express');
var bodyParser = require('body-parser');
const mysql = require('mysql');
var multer = require('multer');
var upload = multer();
const app = express();
const router = express.Router();

var jwt = require('jsonwebtoken');

router.post('/',function(req,res){
				var clientId;

				console.log(req)

				if(req.body.client){

					console.log('in user fact table')

					var sql_factTable = `SELECT * from facttable left join jobs on jobs.jobid = facttable.jobid left join user on facttable.userid = user.userid where facttable.date >="${req.body.startDate}" and facttable.date <= "${req.body.endDate}" and jobs.client = "${req.body.client}";`;

					console.log(sql_factTable);

				}

				req.db.query(sql_factTable,function(err,result){ 

					if(err){
						console.log(err)
						res.send({success:false,msg:"Issue with database"});
					}else{
						
									console.log(result);
									res.send({success:true,factTable:result});
								}

						})


})
module.exports = router; 