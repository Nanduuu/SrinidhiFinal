var express = require('express');
var app = express();
var router = express.Router();
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');
var jsonParser  = bodyParser.json();
var urlencodedparser = bodyParser.urlencoded({extended:true});
var formidable = require('formidable');
var fs = require('fs');
const excelToJson = require('convert-excel-to-json');


function makeObj(data,init) {

	console.log(data);
	var out= [];
	var jobid = init;
	if(data){
		
		for(var i=0; i< data.length; i++){
 			var temp={};
			//var input = data[i];
			jobid++;

					temp.Worker = data[i].A;
					temp.Client =data[i].B;
					temp.date = data[i].C;
					temp.start_time = new Date (data[i].D);
					temp.end_time = data[i].E;
					temp.shift_type = data[i].F;
					temp.count = data[i].G;
					temp.jobid = jobid;

			out.push(temp);
			

		}
		console.log(out);
		return out;
	}
}


router.post('/',urlencodedparser,function(req,res){

	var response = [];
	//var rowData;
	// var objfile;
  	var form = new formidable.IncomingForm();

		  form.parse(req, function (err, fields, files) {
		  	if(err){
		  		res.send({msg:"Failed to load"})
		  	}
		    
		     var objfile = excelToJson({
		    	sourceFile: files.jobs.path,
		     });


		      req.db.query('select max(jobid) as max from jobs;',function(err,result){

		 		if(err){
		 			res.send({success:false,msg:"issue with database"});
		 		}else{
		 			//console.log(objfile.Sheet1)
		 		 	var	rowData = makeObj(objfile.Sheet1, result[0].max); 
		 		 	console.log(result[0].max);
		 		    for (var i = 0 ;i< rowData.length; i++){
		 			var data = rowData[i];
		 		

		 			var sql_insert = 'INSERT INTO jobs SET ?';
		 					req.db.query(sql_insert,data,function(err,result){
								if(err){ 
									console.log(err);
									if(err.code === 'ER_DUP_ENTRY'){
										
										response.push(data);
										//res.send({success:false, msg:"Duplicate Entry"});
									}else{
										response.push(data);
											//res.send({success:false, msg:"Issue with database"});
									}
								}else {
											
									//res.send({success:true,msg:"Job added Successfully"});
								}
							})
				}


		 			}


		 		})
		      

	


		   })
		     
		 	
					 	
			

			if(response.length === 0){
					 		res.send({success:true,msg:"All the jobs posted successfully"});
					 	}else{
					 		res.send({success:true,data:response,msg:'Partially jobs posted'});
			}

		 
		 		

	})
  

module.exports = router; 