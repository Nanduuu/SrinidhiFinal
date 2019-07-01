var schedule = require('node-schedule');
var mysql = require('mysql');
var rule = new schedule.RecurrenceRule();
rule.hour  = 23;
rule.minute = 30;
rule.second = 01;


 
var j = schedule.scheduleJob(rule, function(){

		var con = mysql.createConnection({
					  host: "localhost",
					  user: "root",
					  password: "root",
					  database: "test",
					  multiplequeries: 'true',
					});
			
			con.connect(function(err) {
				console.log(err);

			});

			var sql_fetch_data = `select jb.jobid, jb.start_time, jb.end_time, uj.date, uj.userid, jb.shift_type from userjobs uj left join jobs jb on jb.jobid = uj.jobid where uj.date = "${ new Date().toISOString().slice(0,10) + ' 00:00:00'}"`;

			console.log(sql_fetch_data);

			// con.query('delete from facttable',function(err,res){
			// 	if(err){
			// 		console.log(err);
			// 	}
			// })

			con.query(sql_fetch_data,function(err,result){

				if(err){
					console.log(err)
				}else{

					console.log(result);

				result.map(function(row){
					con.query('INSERT INTO facttable SET ? ',row, function(err,result){
					if(err){
						console.log(err)
					}
					console.log(result);
					})


				})  
				con.end();
				}

		})
		

});



