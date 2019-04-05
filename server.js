const express = require('express');
var bodyParser = require('body-parser');
const mysql = require('mysql');
var http = require('http');
var schedule = require('node-schedule'); 
const fs = require('fs');
const app = express();
const router = express.Router();
const port = process.env.PORT || 8080;
const newuser = require('./newuser.js')
const login = require('./login.js')
const addclient = require('./addclient.js');
const activegetClients = require('./activegetClients');
const inactivegetClients = require('./inactivegetClients');
const addJob = require('./addJob');
const getJobDetails = require('./getJobDetails');
const deleteClients = require('./deleteClients');
const disableClient = require('./disableClient');
const enableClient = require('./enableClient');
const getEditClient = require('./getEditClient');
const updateEditClient = require('./updateEditClient')
const addShift = require('./addShift');
const getShiftDetails = require('./getShiftDetails');
const getAdminDashboardDetails = require('./getAdminDashboardDetails');
const deleteJobs = require('./deleteJobs');
const updateEditJob = require('./updateEditJob');
const staffgetJobDetails = require('./staffgetJobDetails');
const staffconfirmjob = require('./StaffConfirmjob');
const staffScheduledJobDetails = require('./staffScheduledJobDetails');
const getClientInvoicerates = require('./getClientInvoicerates');
const getStaffInvoicerates = require('./getStaffInvoicerates');
const updateInvoicerates = require('./updateInvoiceRates');
const getUserDetails = require('./getUserDetails');
const enableDisableUser  = require('./enableDisableUser');
const bulkJobUploads = require ('./bulkJobUploads');

const timezone = 'UTC';
process.env.TZ = timezone;

// var date = new Date('1999-12-17T22:00:00');
// var date2 = new Date('1999-12-18T06:00:00');

// var timeDiff = Math.abs(date2.getTime() - date.getTime());
// var diffDays = Math.ceil(timeDiff / (1000 * 3600 )); 

// console.log(date2.getTimezoneOffset())

var con = mysql.createConnection({
		  host: "localhost",
		  user: "root",
		  password: "root",
		  database: "test",
		  timezone:'UTC',
		  dateStrings:true,
		});

con.connect(function(err){
	if(err){
		console.log(err);
	}
});

if(con){
	app.use(function(req,res,next){
		req.db = con;
		  next();
	})
}


con.query('SELECT connection_id();',function(err,result){
	console.log(result)
})

const getJob = require('./getJob');
var path = require("path");

const PDFDocument = require ('pdfkit');

app.use(express.static('public'));


app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 



//app.use(upload.array()); 
app.use(express.static('public'));


app.use("/api/getClientInvoiceRates/", getClientInvoicerates)
app.use("/api/getStaffInvoiceRates/", getStaffInvoicerates)
app.use('/api/newuser/',newuser);
app.use('/api/login/',login);
app.use('/api/addclient/',addclient);
app.use('/api/activegetClients/',activegetClients);

app.use('/api/disableClient/',disableClient);
app.use('/api/enableClient/',enableClient);
app.use('/api/getEditClient/',getEditClient);
app.use('/api/updateEditClient/',updateEditClient);
app.use('/api/addShift/',addShift);
app.use('/api/getShiftDetails/',getShiftDetails);

app.use('/api/inactivegetClients/',inactivegetClients);
app.use('/api/getJob/',getJob);
app.use('/api/addJob/',addJob);
app.use('/api/getJobDetails/',getJobDetails);
app.use('/api/deleteClients/',deleteClients);
app.use('/api/deleteJobs/',deleteJobs);
app.use('/api/updateeditjob/',updateEditJob);

app.use('/api/staffgetJobDetails/',staffgetJobDetails);
app.use('/api/staffScheduledJobDetails/',staffScheduledJobDetails);
app.use("/api/staffconfirmjob/" ,staffconfirmjob)

app.use("/api/getAdminDashboardDetails/" ,getAdminDashboardDetails);

app.use("/api/updateInvoiceRates/" ,updateInvoicerates);

app.use("/api/getUserDetails/" ,getUserDetails);

app.use("/api/enableDisableUser/" ,enableDisableUser);
app.use('/api/Bulkjobuploads/', bulkJobUploads);



//var date = new Date('2019-04-01T06:00:00.000Z');
//var date1 = new Date('2019-04-01 06:00:00');

console.log(new Date());	
// console.log(date);
// console.log(date1);
// console.log(date.toISOString()); 
// console.log(date.toUTCString());

// console.log(date.\	());

app.use(express.static(path.join(__dirname, 'public/build')));
  // Handle React routing, return all requests to React app
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'public/build', 'index.html'));
  });


var server = http.createServer(app);

server.listen(port,function(){
	console.log( 'Server started ... ' + port);
});
 