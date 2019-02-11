const express = require('express');
var bodyParser = require('body-parser');
const mysql = require('mysql');
var multer = require('multer');
var upload = multer();
const app = express();
const router = express.Router();



router.post('/',function(req,res){
				console.log("client disbale")
				var sql = 'update client SET ct_end_date ="'+ new Date().toISOString().slice(0,10) + '" where ct_name ="' + req.body.Data +'";';
				req.db.query(sql,function(err,result){
					if(err){
						console.log(err);
					}
					console.log(result)
					res.send({success:true,msg:"Client disabled"});
				})
		
})
module.exports = router; 