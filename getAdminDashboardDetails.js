const express = require('express');
var bodyParser = require('body-parser');
const mysql = require('mysql');
var multer = require('multer');
var upload = multer();
const app = express();
const router = express.Router();

var jwt = require('jsonwebtoken');

router.post('/',function(req,res){
	
		var sql = `select userjobs.jobid, jobs.client,  user.Fname, jobs.worker, userjobs.date ,userjobs.from_time, userjobs.to_time ,shifts.shift_type  from  userjobs,jobs,user,shifts where jobs.jobid = userjobs.jobid and jobs.shift_id= shifts.shift_id and userjobs.userid = user.userid and userjobs.date = "${req.body.Data}";`

		req.db.query(sql,function(err,result){
			if(err){
				res.send({success:false,msg:'Issue with Database'});
			}else{
				console.log(result);
				res.send({success:true,rows:result})
			}
		})

})
module.exports = router; 