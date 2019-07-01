const express = require('express');
var bodyParser = require('body-parser');
const mysql = require('mysql');
var multer = require('multer');
var upload = multer();
const app = express();
const router = express.Router();


router.post('/',function(req,res){

			var next_client_id;

			var con = mysql.createConnection({
					  host: "localhost",
					  user: "root",
					  password: "root",
					  database: "test"
					});
			try{
			con.connect(function(err) {
					  if (err) {
					  			throw err;
					  			res.send({success:false,msg:'Issue at conncting database'});
					  	}else{

					  		let data  = {
					  			'ct_id' : null,
					  			'ct_name' : req.body.Data.ct_name,
					  			'ct_street_number' : req.body.Data.ct_street_number,
					  			'ct_street_name' : req.body.Data.ct_street_name,
					  			'ct_city_name':req.body.Data.ct_city_name,
					  			'ct_pincode' : req.body.Data.ct_pin,
					  			'ct_start_date': new Date(),
					  			'ct_end_date':"9999-12-31"
					  		}
					  		let sql_getid = 'SELECT MAX(ct_id) as MAX from client;';
					  		
					  		var sql = 'INSERT INTO CLIENT SET ?';

					  		con.query(sql_getid, function(err,result){

					  			if(result[0].MAX == null){
					  				data.ct_id = 1;
					  			} else {				
					  				data.ct_id = result[0].MAX + 1;					  			
					  			}


					  			let query =	con.query(sql, data, function(err,results){
					  					if(err){ 
								  				console.log(err);
								  				if(err.code === 'ER_DUP_ENTRY'){
								  					con.end();
								  					res.send({success:false, msg:"Client and Branch cannot be duplicate"});
								  				}else{
								  					con.end();
								  					res.send({success:false, msg:"Issue with database"});
								  				}
								  			}else {
								  				//console.log(rows);
								  				con.end();
								  				res.send({success:true,msg:"Client Added Successfully"});
								  				
											}
										});
					  		
					  		})
					  		
							}
			});
  		}catch(e){
  			res.send({success:false,msg:'Issue at conncting database'});
  		}
		   
});


module.exports = router;