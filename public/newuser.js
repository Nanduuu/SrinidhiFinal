const express = require('express');
var bodyParser = require('body-parser');
const mysql = require('mysql');
var multer = require('multer');
var upload = multer();
const app = express();
const newuser = express.Router();
var bodyParser = require('body-parser');
var jsonParser  = bodyParser.json();
var urlencodedparser = bodyParser.urlencoded({extended:true});



newuser.post('/',urlencodedparser,function(req,res){
		console.log(req);

		res.send={success:true};

})
con.end();



module.exports = newuser;