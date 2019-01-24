const express = require('express');
var bodyParser = require('body-parser');
const mysql = require('mysql');
var multer = require('multer');
var http = require('http');
var schedule = require('node-schedule'); 
var upload = multer();
const fs = require('fs');
const app = express();
const router = express.Router();
const port = process.env.PORT || 8080;
const newuser = require('./newuser.js')
const login = require('./login.js')
const addclient = require('./addclient.js');
const getClients = require('./getClients');
const addJob = require('./addJob');
const getJobDetails = require('./getJobDetails');
const deleteClients = require('./deleteClients');
const deleteJobs = require('./deleteJobs');
const getJob = require('./getJob');
var path = require("path");

const PDFDocument = require ('pdfkit');

app.use(express.static('public'));

// for parsing application/json
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 
//form-urlencoded

// for parsing multipart/form-data
app.use(upload.array()); 
app.use(express.static('public'));

app.use('/newuser/',newuser);
app.use('/api/login/',login);
app.use('/api/addclient',addclient);
app.use('/api/getClients',getClients);
app.use('/api/getJob',getJob);
app.use('/api/addJob',addJob);
app.use('/api/getJobDetails',getJobDetails);
app.use('/api/deleteClients',deleteClients);
app.use('/api/deleteJobs',deleteJobs);
// var j = schedule.scheduleJob( '1 * * * * *', function(){
//   console.log('The answer to life, the universe, and everything!');
//   var con = mysql.createConnection({
// 		  host: "localhost",
// 		  user: "root",
// 		  password: "root",
// 		  database: "test"
// 		});
// 		con.connect(function(err){
// 			if(err){
// 				con.end();
// 			}else{
// 				var sql = 'select ct_branch from client;';
// 				con.query(sql,function(err,result){
// 					console.log(result)
// 					con.end();
// 				})
// 			}
// 		})
// 		// Create a document
// 		doc = new PDFDocument
// 		doc.pipe (fs.createWriteStream('output'+ new Date().getTime() + '.pdf'))


// 		doc.fontSize(25)
// 		   .text('Some text with an embedded font!', 100, 100)


// 		doc.addPage()
// 		   .fontSize(25)
// 		   .text('Here is some vector graphics...', 100, 100)


// 		doc.save()
// 		   .moveTo(100, 150)
// 		   .lineTo(100, 250)
// 		   .lineTo(200, 250)
// 		   .fill("#FF3300")


// 		doc.scale(0.6)
// 		   .translate(470, -380)
// 		   .path('M 250,75 L 323,301 131,161 369,161 177,301 z')
// 		   .fill('red', 'even-odd')
// 		   .restore()


// 		doc.addPage()
// 		   .fillColor("blue")
// 		   .text('Here is a link!', 100, 100)
// 		   .underline(100, 100, 160, 27, )
// 		   .link(100, 100, 160, 27, 'http://google.com/')


// 		doc.end()
// });

// for parsing application/xwww-

app.use(express.static(path.join(__dirname, 'public/build')));
  // Handle React routing, return all requests to React app
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'public/build', 'index.html'));
  });


var server = http.createServer(app);

server.listen(port,function(){
	console.log( 'Server started ... ' + port);
});
