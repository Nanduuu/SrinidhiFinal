const express = require('express');
var bodyParser = require('body-parser');
const mysql = require('mysql');
var http = require('http');
var schedule = require('node-schedule'); 
const fs = require('fs');
const app = express();
const router = express.Router();
const port = process.env.PORT || 8080;
const newuser = require('./newuser')
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
const deleteStaffJobs = require('./deleteStaffJobs');
const getFactTableData = require('./getFactTableData');
const approveTimeSheet = require('./approveTimeSheet');
const submitTimeSheet = require('./submitTimeSheet');
const deleteShift = require('./deleteShift');
const updateUserDetails = require('./updateUserDetails');
const updatePassword = require('./updatePassword');

//const time = require('./updateFactTable');


const timezone = 'UTC';
process.env.TZ = timezone;

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


const getJob = require('./getJob');
var path = require("path");

const PDFDocument = require ('pdfkit');

app.use(express.static('public'));


app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 

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
app.use('/api/deleteStaffJobs/',deleteStaffJobs);
app.use('/api/getFactTableData/',getFactTableData);
app.use('/api/approveTimeSheet/',approveTimeSheet);
app.use('/api/submitTimeSheet/',submitTimeSheet);
app.use('/api/deleteShift/',deleteShift);
app.use('/api/updateUserDetails/',updateUserDetails);
app.use('/api/updatePassword/',updatePassword);

app.get('/acks/*', function(req,res){

	console.log(req.path)
	 res.sendFile(path.join(__dirname, req.path));
})



app.use(express.static(path.join(__dirname, 'public')));


// app('/', function(req,res){
// 	res.sendFile(path.join(__dirname,'public','logo.png'))
// })

  
  app.get('/*', function(req, res) {
  	console.log('in static files')
    res.sendFile(path.join(__dirname, 'public', 'build/index.html'));
  });


// app.get('/*', function (req, res) {
//    res.sendFile(path.join(__dirname, 'build', 'index.html'));
//  });

var server = http.createServer(app);

server.listen(port,function(){
	console.log( 'Server started ... ' + port);
});
 