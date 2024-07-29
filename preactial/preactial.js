var express = require('express');
var bodyParser = require('body-parser');
let app = express();
const session = require('express-session');
var http = require('http');



app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({ secret: "test123", resave: true, saveUninitialized: true }));

app.use(express.static(__dirname + "/public"));

app.get('/home', function(req, res) {
    res.sendFile(__dirname + '/public/home.html');
});
app.get('/aboutus', function(req, res) {
    res.sendFile(__dirname + '/public/aboutus.html');
});
app.get('/contact', function(req, res) {
    res.sendFile(__dirname + '/public/contact.html');
});
app.get('/page4', function(req, res) {
    res.sendFile(__dirname + '/public/page4.html');
});

app.get('/page5', function(req, res) {
    res.sendFile(__dirname + '/public/page5.html');
});



app.listen(8080,()=>{
	console.log("Server at 8080");
});