//declare back-end libraries
var mysql = require("mysql");
var express = require("express");
var app = express();
var cors = require("cors");
const bp = require("body-parser");
//use cors lib for disable cors error
app.use(cors());

app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));
//declare login variables
var username = "";
var password = "";
//declare profile variables
var fname = "";
var lname = "";
var title = "";
var city = "";
var state = "";
var mobile = "";
var email = "";
var website = "";
//connect to database
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "resume_maker",
});
con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
  //query to get user info
  con.query("SELECT * FROM user", function (err, result, fields) {
    if (err) throw err;
    username = result[0].username;
    password = result[0].password;
    //query to get personal info
    con.query(
      `SELECT * FROM profile where username='${result[0].username}'`,
      function (err, result, fields) {
        if (err) throw err;
        fname = result[0].fname;
        lname = result[0].lname;
        title = result[0].title;
        city = result[0].city;
        state = result[0].state;
        mobile = result[0].mobile;
        email = result[0].email;
        website = result[0].website;
      }
    );
  });
});

//send data for authentication
app.post("/", function (req, res) {
  console.log("Got body:", req.body);
  res.sendStatus(200);
  // res.send({ username, password });
});
//send data to personal_info page
app.get("/profile", function (req, res) {
  res.send({ fname, lname, title, city, state, mobile, email, website });
});
//listen to port 8080 where database is in
app.listen(8080);
