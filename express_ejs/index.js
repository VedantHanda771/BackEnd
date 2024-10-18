const express = require('express');
const expressSession = require('express-session');
const bodyParser = require('body-parser');

let app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.use(expressSession({
    secret: "test@123",
    resave: true,
    saveUninitialized: true
}));

app.set('view engine', 'ejs');

app.get('/', function(req, res) {
    res.render('home');
});

app.get('/dataexp', function(req, res) {
    res.render('data', { uname: "Vedant", pageurl: req.url });
});

app.get('/login', function(req, res) {
    let msg = req.session.msg || "";
    res.render('login_view', { msg: msg });
});

app.post('/loginsubmit', function(req, res) {
    const { email, pass } = req.body;
    if (email === "" || pass.length < 7 || pass.length > 14) {
        res.render('login_view', { msg: "Please enter correct details" });
    } else {
        req.session.email = email;
        res.redirect('/homepage');
    }
});

app.get('/homepage', function(req, res) {
    if (req.session.email !== undefined && req.session.email !== "") {
        res.render('home_view', { msg: `Welcome, ${req.session.email}` });
    } else {
        req.session.msg = "Please login first to view home page";
        res.redirect('/login');
    }
});

app.get('/logout', function(req, res) {
    req.session.email = "";
    req.session.msg = "Successfully logged out";
    res.redirect('/login');
});

app.listen(8080, () => console.log("Server running on port 8080"));