const express = require('express');
var bodyParser = require('body-parser');

var multer = require('multer');
var upload = multer();
const app = express();
const router = express.Router();

var jwt = require('jsonwebtoken');

router.post('/',function(req,res){

				var sql = 'select ct_name from client where ct_end_date != "9999-12-31";';
				req.db.query(sql,function(err,result){
					if(err){
						console.log(err);
					}
					console.log(result)
					res.send({success:true,inactiveclients:result});
				})

})
module.exports = router; 