var express = require('express'); 
let app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended : true })); //encode the maximum limit of form by post and default is 100kb

app.get('/', function(req,res){
	res.send("<h1>Welcome</h1>");
});


app.get('/login', function(req,res){
	let formdesign='<form action = "/loginsubmit">';
	formdesign += '<p>Enter Email<input type = "text" name="email"></p>';
	formdesign += '<p>Enter Password<input type = "password" name="pass"></p>';
	formdesign += '<p>Enter Email<input type = "submit" value="Login"></p></form>';
	res.send(formdesign);
});

app.get('/signup', function(req,res){
	let formdesign='<form action = "/signupsubmit" method="POST">';
	formdesign += '<p>Enter Name<input type = "text" name="name"></p>';
	formdesign += '<p>Enter Email<input type = "text" name="email"></p>';
	formdesign += '<p>Enter Password<input type = "password" name="pass"></p>';
	formdesign += '<p>Enter Email<input type = "submit" value="signup"></p></form>';
	res.send(formdesign);
	
});

app.post('/signupsubmit', function(req,res){
	res.send("<p>Name"+req.body.name+"</p><p>Email:-"+req.body.email+"</p>");
	
});

app.get('/loginsubmit', function(req,res){
	var email = req.query['email'];
	var pass = req.query['pass'];
	res.send("<h2>Email:-"+email+"</h2>"+"<h2>Password:-"+pass+"</h2>");

});

app.get('/aboutus', function(req,res){
	res.send("<p>About Us</p>");
});
app.listen(8080,()=>console.log("server at 8080"));


//all href links age by default get by get method.