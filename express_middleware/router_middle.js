var express = require('express');
var app = express();
var expressSession = require('express-session');
var bodyParser = require('body-parser');

// Middleware to parse incoming form data
app.use(bodyParser.urlencoded({ extended: true }));

// Setting EJS as the template engine
app.set('view engine', 'ejs');

// Session management middleware
app.use(expressSession({
  secret: "test123!@#",
  resave: true,
  saveUninitialized: true
}));

// Define router
var router = express.Router();

// Global middleware to log all incoming requests
router.use((req, res, next) => {
  console.log("URL called: " + req.url);
  next();
});

// Middleware for logging requests to /login specifically
router.use("/login", (req, res, next) => {
  console.log("URL called: " + req.url);
  console.log("Method used: " + req.method);
  next();
});

// Route to handle form submission from contact us page
router.post("/contactusSubmit", function(req, res) {
  console.log("Name: " + req.body.name);
  console.log("Query: " + req.body.uquery);
  res.send("<h1>Name: " + req.body.name + " </h1><h1>Query: " + req.body.message + "</h1>");
});

// Mount router on the root URL
app.use("/", router);

// Define routes
app.get("/", function(req, res) {
  res.send("<h1>Welcome to the first page</h1>");
});

app.get("/homepage", function(req, res) {
  res.send("<h1>Welcome to the homepage</h1>");
});

// Render login form
app.get("/login", function(req, res) {
  console.log("Login form displayed");
  res.render("login_middle");
});

// Handle login form submission
app.post("/login", function(req, res) {
  console.log("Login form submitted");
  res.send("<h1>Email: " + req.body.email + "</h1>");
}); 

// Render contact us form
app.get("/contactus", function(req, res) {
  res.render("contactus_view");
});

// Start server on port 8080
app.listen(8080, () => console.log("Server running at http://localhost:8080/"));
