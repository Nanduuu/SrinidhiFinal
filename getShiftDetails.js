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
				let sql_ct_id = 'SELECT CT_ID from CLIENT where ct_name ="' + req.body.Data + '";';
				

				req.db.query(sql_ct_id,function(err,result){

					if(err){
						res.send({success:false,msg:"Issue with database"});
					}else{
						clientId = result[0].CT_ID;
						var sql = `select * from shifts where ct_id = ${clientId};`
						req.db.query(sql,function(err,result){
								if(err){
									res.send({success:false,msg:"Issue with database"})
								}else{
									console.log(result);
									res.send({success:true,shiftDetails:result});
								}

						})


					}


				})

	}
		
)
module.exports = router; 