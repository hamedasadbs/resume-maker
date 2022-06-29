var mysql = require("mysql");
var express = require("express");
var app = express();
const cors = require("cors");

app.use(cors());

var username = "";
var password = "";

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "resume_maker",
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
  con.query("SELECT * FROM user", function (err, result, fields) {
    if (err) throw err;
    username = result[0].username;
    password = result[0].password;
  });
});

app.get("/", function (req, res) {
  res.send({ username: username, password: password });
});

app.get("/profile", function (req, res) {
  res.send("testing profile");
});

app.listen(8080);
