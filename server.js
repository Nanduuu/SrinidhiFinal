const express = require('express');
var bodyParser = require('body-parser');
const mysql = require('mysql');
var http = require('http');
const app = express();
const port = process.env.PORT || 8080;
const newuser = require('./Routers/Users/newuser')
const login = require('./Routers/login.js')
const addclient = require('./Routers/Client/addclient.js');
const activegetClients = require('./Routers/Client/activegetClients');
const inactivegetClients = require('./Routers/Client/inactivegetClients');
const addJob = require('./Routers/Job/addJob');
const getJobDetails = require('./Routers/Job/getJobDetails');
const deleteClients = require('./Routers/Client/deleteClients');
const disableClient = require('./Routers/Client/disableClient');
const enableClient = require('./Routers/Client/enableClient');
const getEditClient = require('./Routers/Client/getEditClient');
const updateEditClient = require('./Routers/Client/updateEditClient')
const addShift = require('./Routers/Shifts/addShift');
const getShiftDetails = require('./Routers/Shifts/getShiftDetails');
const getAdminDashboardDetails = require('./Routers/Job/getAdminDashboardDetails');
const deleteJobs = require('./Routers/Job/deleteJobs');
const updateEditJob = require('./Routers/Job/updateEditJob');
const staffgetJobDetails = require('./Routers/UserJobs/staffgetJobDetails');
const staffconfirmjob = require('./Routers/UserJobs/StaffConfirmjob');
const staffScheduledJobDetails = require('./Routers/UserJobs/staffScheduledJobDetails');
const getClientInvoicerates = require('./Routers/TimeSheetAndInvoice/getClientInvoiceRates');
const getStaffInvoicerates = require('./Routers/TimeSheetAndInvoice/getStaffInvoicerates');
const updateInvoicerates = require('./Routers/TimeSheetAndInvoice/updateInvoiceRates');
const getUserDetails = require('./Routers/Users/getUserDetails');
const enableDisableUser  = require('./Routers/Users/enableDisableUser');
const bulkJobUploads = require ('./Routers/Job/bulkJobUploads');
const deleteStaffJobs = require('./Routers/UserJobs/deleteStaffJobs');
const getFactTableData = require('./Routers/FactTable/getFactTableData');
const approveTimeSheet = require('./Routers/TimeSheetAndInvoice/approveTimeSheet');
const submitTimeSheet = require('./Routers/UserJobs/submitTimeSheet');
const deleteShift = require('./Routers/Shifts/deleteShift');
const updateUserDetails = require('./Routers/Users/updateUserDetails');
const updatePassword = require('./Routers/Users/updatePassword');
const getProcessFactTableDetails = require('./Routers/FactTable/getProcessFactTableDetails');
const processInvoice = require('./Routers/TimeSheetAndInvoice/processInvoice');
const updateOfficeAddress = require('./Routers/Users/updateOfficeAddress');
const getOfficeAddress = require('./Routers/Users/getOfficeAddress');
const getJob = require('./Routers/Job/getJob');


const time = require('./Routers/FactTable/updateFactTable');

const Nexmo = require('nexmo');
const nexmo = new Nexmo({
  apiKey: 'd575ef29',
  apiSecret: 'nCCPrOhjiPIooh4X'
})

const from = 'Nexmo'
const to = '919945215941'
const text = new Date().toISOString();

nexmo.message.sendSms(from, to, text)

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



var path = require("path");

//const PDFDocument = require ('pdfkit');


app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 

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
app.use('/api/getProcessFactTableDetails/',getProcessFactTableDetails);
app.use('/api/processInvoice/', processInvoice);
app.use('/api/updateOfficeAddess/',updateOfficeAddress);
app.use('/api/getOfficeAddess/',getOfficeAddress);

app.get('/acks/*', function(req,res){

	console.log(req.path)
    res.sendFile(path.join(__dirname, req.path));
 })

app.post('/acks/*', function(req,res){

	console.log( " in post request" + req.path)
    res.sendFile(path.join(__dirname, req.path));
 })

app.get('/Payslips/*', function(req,res){

	console.log( " in post request" + req.path)
    res.sendFile(path.join(__dirname, req.path));
 })


 app.use(express.static(path.join(__dirname, 'public/build')));

  app.get('*', function(req, res) {
  	console.log(req.path)
    res.sendFile(path.join(__dirname, 'public/build', 'index.html'));
  });

var server = http.createServer(app);

server.listen(port,function(){
	console.log( 'Server started ... ' + port);
});
 