const mysql = require('mysql');

var con = mysql.createConnection({
		  host: "localhost",
		  user: "root",
		  password: "root",
		  database: "test"
		});


var db = con.connect(function(err){
	if(err){
		console.log("Error to connect database");
		console.log(err);
	}
})

console.log("in db file",db);

module.exports = {
	db : con,
}