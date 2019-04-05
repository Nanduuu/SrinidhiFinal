const express = require('express');
var bodyParser = require('body-parser');
const mysql = require('mysql');
var multer = require('multer');
var upload = multer();
const app = express();
const router = express.Router();

var jwt = require('jsonwebtoken');

router.post('/',function(req,res){
	
					let data  = { }

					console.log(req.body.Data)
					var shift_type;
					if (req.body.Data.shift_type == 'Long Day'){
						data.Long_day =  req.body.Data.value;
					}else if(req.body.Data.shift_type == 'Bank Holiday'){
						data.Bank_holiday =  req.body.Data.value;
					}else if(req.body.Data.shift_type == 'Sleep Night'){
						data.Sleep_night =  req.body.Data.value;
					}else if (req.body.Data.shift_type == 'Sunday'){
						data.Sunday = req.body.Data.value ;
					}else if (req.body.Data.shift_type == 'Saturday'){
						data.Saturday = req.body.Data.value ;
					}else if (req.body.Data.shift_type == 'Early'){
						data.Early = req.body.Data.value ;
					}else if (req.body.Data.shift_type == 'Late'){
						data.Late = req.body.Data.value ;
					}else if (req.body.Data.shift_type == 'Night'){
						data.Night = req.body.Data.value ;
					}

		

				console.log(data);
				var sql = `update ${req.body.Data.tablename} SET ? where staff_type = "${req.body.Data.staff_type}";`;
				console.log(sql);
				req.db.query(sql,data,function(err,result){
						console.log(result);
						if(err){
							res.send({success:false,msg:"Please submit proper details"});
						}else{
							res.send({success:true,msg:"Updated Successfully"});
						}
				})
			})
		

module.exports = router; 