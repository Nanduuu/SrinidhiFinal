const express = require('express');
var bodyParser = require('body-parser');
const mysql = require('mysql');
var multer = require('multer');
var upload = multer();
const app = express();
const router = express.Router();

var jwt = require('jsonwebtoken');

router.post('/',function(req,res){
	
				var input = {
					ct_name : req.body.Data.ct_name,
					ct_street_number : req.body.Data.ct_street_number,
					ct_street_name : req.body.Data.ct_street_name,
					ct_city_name : req.body.Data.ct_city_name,
					ct_pincode : req.body.Data.ct_pincode,
				}
				var sql = 'update client SET ? where ct_id = "'+ req.body.Data.ct_id +'";';
				req.db.query(sql,input,function(err,result){
					console.log(result)
					if(err){
						console.log(err)
						res.send({success:false,msg:"Issue with database"});
					}else{
						res.send({success:true,msg:"Client Updated successfully"});
					}

					
				})
			
		
})
module.exports = router; 