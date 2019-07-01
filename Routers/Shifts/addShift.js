const express = require('express');
var bodyParser = require('body-parser');
const mysql = require('mysql');
var multer = require('multer');
var upload = multer();
const app = express();
const router = express.Router();


router.post('/',function(req,res){
							console.log("In add Shift")
							var next_shift_id;
		
					  		let data  = {
					  			'ct_id' : null,
					  			'shift_id' : null,
					  			'start_time' : req.body.Data.start_time_string,
					  			'end_time' : req.body.Data.end_time_string,
					  			'shift_type':req.body.Data.shift_type,
					  			
					  		}

					  		let sql_shiftid = 'SELECT MAX(shift_id) as MAX from shifts;';

					  		let sql_ct_id = 'SELECT CT_ID from CLIENT where ct_name ="' + req.body.Data.ct_name + '";';
					  		
					  		var sql = 'INSERT INTO shifts SET ?';

					  		req.db.query(sql_shiftid, function(err,result){
					  			if(err){
					  				console.log(err)
					  				res.send({seuccess:false,msg:"Client does not Exits"})
					  			}else{
					  				
						  			if(result[0].MAX == null){
						  				data.shift_id = 1;
						  			} else {				
						  				data.shift_id = result[0].MAX + 1;					  			
						  			}
						  			console.log(data)
						  			debugger;
						  			req.db.query(sql_ct_id,function(err,result){
						  				if(err){
						  					console.log(err);
						  					res.send({seuccess:false,msg:"Client does not Exits"})
						  				}else{
						  					console.log(result);
						  						data.ct_id = result[0].CT_ID;	
								  				console.log(data);
								  				req.db.query(sql, data, function(err,results){
							  					if(err){ 
							  						console.log(err)
										  			res.send({success:false, msg:"Issue with database"});
										  		}else{
										  			console.log(result);
										  			res.send({success:true,msg:"Client Added Successfully"});
										  				
										  		}
										  			
												}	
												);

								  			}
						  				}
							  			

					  				)
					  			}

					  		})

			});
  		
		   
module.exports = router;