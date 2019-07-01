const express = require('express');
var bodyParser = require('body-parser');
const mysql = require('mysql');
var multer = require('multer');
const pdf = require('./genereatePDF');
var upload = multer();
const app = express();
const router = express.Router();


var jwt = require('jsonwebtoken');

router.post('/',function(req,res){
				var clientId;

				let sql_factTable =  `SELECT * from facttable left join jobs on jobs.jobid = facttable.jobid left join user on facttable.userid = user.userid where facttable.date >="${req.body.startDate}" and facttable.date <= "${req.body.endDate}" and jobs.client = "${req.body.client}";`;
				
				let sql_client = `select * from client where ct_name = "${req.body.client}"`

				let clientRates = `select * from ctinvoice;`

				let sql_officeaddress = `select * from officeaddress;`

				let rates;

				let rate;

				let clientDetails;

				let officeaddress;

				var fileName = req.body.client + new Date(req.body.startDate).toISOString().slice(0,10);

				req.db.query(clientRates,function(err,result){
					rates = result;
					console.log(rates);
				 })

				req.db.query(sql_client ,function(err,result){
					clientDetails  = result[0];
					console.log(clientDetails);
				 })

				req.db.query(sql_officeaddress ,function(err,result){
					officeaddress  = result[0];
					console.log(clientDetails);
				 })

				req.db.query(sql_factTable,function(err,result){ 



					if(err){
						res.send({success:false, url: ""})
					}else{

						console.log(result) 

						tableData = [];
						var rate = 0
						var total = 0
						for(let i = 0; i < result.length; i++ ){

							let data = [];
							let shift_type = 'Long_day';
							data.push(i + 1);
							data.push(result[i].client);
							data.push(result[i].worker);
							data.push(result[i].shift_type);
								var date1 = new Date(result[i].start_time);
								var date2 = new Date(result[i].end_time);
								var diff = date2 - date1
								var date = new Date(diff);
							data.push( Math.round(diff / 1000 / 60  / 60))
							
							for(let j = 0; j<rates.length ;j++ ){

								if(result[i].worker == rates[j].staff_type){
									row  = rates[j];
									data.push( row[shift_type])
									rate = row[shift_type];
								}
							}

							data.push(rate * Math.round(diff / 1000 / 60  / 60))
							data.push(0)

							total = total + ( rate * Math.round(diff / 1000 / 60  / 60) )
							tableData.push(data)

							}

							tableData.push( ['','','','','','Sub Total','',total] )
               				tableData.push ( ['','','','','','VAT Total','',0] )
               				tableData.push ( ['','','','','','Toatl','',total] )
               				tableData.push ( ['','','','','','Balance Due','',total] )

							console.log(tableData);

						}

						pdf.generatePDF(res ,tableData, fileName , clientDetails,officeaddress).then(function(result){
							//console.log(res)
							res.send({success:true, url: fileName})
								}).catch(function(err){
							console.log(err)
							res.send({success:false, url: ""})
				})


		})

})

module.exports = router; 	