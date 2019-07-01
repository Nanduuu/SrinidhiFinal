const express = require('express');
var bodyParser = require('body-parser');
const mysql = require('mysql');
var multer = require('multer');
var upload = multer();
const app = express();
const router = express.Router();

var jwt = require('jsonwebtoken');

router.post('/',function(req,res){
		console.log('In Admin dashboard details');
		var sql = `select userjobs.jobid, jobs.client, user.Fname, jobs.worker, userjobs.date ,userjobs.start_time, userjobs.end_time ,jobs.shift_type  from  userjobs,jobs,user  where jobs.jobid = userjobs.jobid and user.userid = userjobs.userid and  userjobs.date = "${req.body.Data}";`

		req.db.query(sql,function(err,result){
			if(err){
				console.log(err)
				res.send({success:false,msg:'Issue with Database'});
			}else{
				console.log(result);
				res.send({success:true,rows:result})
			}
		})

})
module.exports = router; 