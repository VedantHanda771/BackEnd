var express = require('express');
var bodyParser = require('body-parser');
let app = express();
const session = require('express-session');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.use(session({ secret: "test123", resave: true, saveUninitialized: true }));

app.get('/', function(req, res) {
    res.send("<h1>Welcome</h1>");
});

app.get('/login', function(req, res) {
    let formdesign = '<form action="/loginsubmit">';
    formdesign += '<p>Enter Email <input type="text" name="email"></p>';
    formdesign += '<p>Enter Password <input type="password" name="pass"></p>';
    formdesign += '<p><input type="submit" value="Login"></p></form>';
    res.send(formdesign);
});

app.get('/signup', function(req, res) {
    let formdesign = '<form action="/signupsubmit" method="POST">';
    formdesign += '<p>Enter Name <input type="text" name="name"></p>';
    formdesign += '<p>Enter Email <input type="text" name="email"></p>';
    formdesign += '<p>Enter Password <input type="password" name="pass"></p>';
    formdesign += '<p><input type="submit" value="Signup"></p></form>';
    res.send(formdesign);
});

app.post('/signupsubmit', function(req, res) {
    res.send("<p>Name: " + req.body.name + "</p><p>Email: " + req.body.email + "</p>");
});

app.get('/loginsubmit', function(req, res) {
    var email = req.query['email'];
    var pass = req.query['pass'];
    res.send("<h2>Email: " + email + "</h2><h2>Password: " + pass + "</h2>");
});

app.get('/aboutus', function(req, res) {
    res.send("<p>About Us</p>");
});

app.get('/contactus', (req, res) => {
    res.sendFile(__dirname + '/public/contactus.html');
});

// Session example
app.get('/sessionpage1', function(req, res) {
    req.session.msg = "welcome to server side session handling";
    res.send('<h1>Session data set</h1><a href="/sessionpage2">Click to view session value</a>');
});

app.get('/sessionpage2', function(req, res) {
    res.send("<h1>Value in session: " + req.session.msg + "</h1>");
});

// Login demo with session
app.get('/sessionlogin', function(req, res) {
    res.sendFile(__dirname + "/public/login.html");
});

app.post('/s_login_sbt', function(req, res) {
    let email = req.body.email;
    let pass = req.body.pass;
    req.session.emailid = email;
    res.redirect('/session_home');
});

app.get('/session_home', function(req, res) {
    if (req.session.emailid != undefined) {
		res.sendFile(__dirname + "/public/home.html");
    } else {
        req.session.ermsg = "Cannot view home page without login";
        res.redirect('/errpage');
    }
});

app.get('/errpage', function(req, res) {
    // Check if there's an error message in the session; if not, set a default message
    let errorMessage = req.session.ermsg || "An error occurred. Please try logging in.";
    res.sendFile(__dirname + "/public/error.html");
});


app.get('/sessionid', function(req, res){
	res.send(req.session.id);
});

app.get('/session_reg', function(req, res){
	req.session.regenerate(function(err){
		res.send("<h1>"+req.session.id+"</h1>");
	});
});

app.get('/logout', (req,res)=>{
	req.session.destroy();
	res.redirect('/sessionlogin');
});

app.listen(8080, () => console.log("Server running at port 8080"));


//All href methods are called using get