var express =require('express');
let app = express();


let cookieParser = require('cookie-parser');
app.use(cookieParser());

app.get('/setcookie',(req,res)=>{
	res.cookie("msg","welcome Vedant to cookie world",{maxAge:1000*60*60});
	res.send("<h1>Cookie Set</h1>");
	
});

app.get('/readcookie1',(req,res)=>{
	res.send(req.cookies);
});
app.get('/readcookie2',(req,res)=>{
	res.send(req.cookies);
});
app.listen(8080,()=>{
	console.log("server at 8080");
});