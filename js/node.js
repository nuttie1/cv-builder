var express = require('express');
var app = express();

let a = "";

var server = app.listen(8081, function () {
  var host = server.address().address
  var port = server.address().port

  console.log("Example app listening at http://%s:%s", host, port)
})
var mysql = require('mysql');

var con = mysql.createConnection({
  host: "mysql.metropolia.fi",
  user: "rikukosk@users.metropolia.fi",
  password: "riku",
  database: "test"
});

con.connect(async function(err) {
  if (err) throw err;
  await con.query("SELECT * FROM event", function (err, result, fields) {
    if (err) throw err;
    a = result;
    console.log(result);
  });
});