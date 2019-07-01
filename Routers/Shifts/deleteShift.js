const express = require('express');
const formidable = require('express-formidable');
const fs = require('fs');


var app = express();
//app.use(formidable());
const router = express.Router();

//router.use(formidable());

var jwt = require('jsonwebtoken');

router.post('/',function(req,res){
	

				//console.log(req.fields); 
				//console.log(req.files.ack)

				var data = req.body;


						console.log('delete shift')
						
						var sql = `delete from shifts where shift_id = "${data.shift_id}" and ct_id = "${data.ct_id}";`

						req.db.query(sql,function(err,result){
							if(err){
								console.log(err)
								res.send( {seccess:false,msg:"Failed to delete shift" });
							}else{
								req.db.query('commit',function(err,result){
									if(err){
										console.log(err)
									}
									res.send({success:true,msg:"Deleted Successfully"});
								})
								
							}
						})
					}

		
)
module.exports = router; 