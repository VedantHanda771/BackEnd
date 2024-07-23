var http = require('http');
http.createServer(function(req,res){
	res.writeHead(200,{'content-type':"text/html"});
	res.write('<ul><li><a href="http://localhost:8080/">Home</a></li>');
	res.write('<li><a href="http://localhost:8080/aboutus">About US</a></li>');
	res.write('<li><a href="http://localhost:8080/FAQ">FAQ</a></li>');
	res.write('<li><a href="http://localhost:8080/login">Login</a></li>');
	res.write('</ul>');
	if(req.url=='/')
		res.write("<div>into home</div>");
	else if(req.url=='/aboutus')
		res.write("<div>Hi I am Vedant</div>");
	else if(req.url=='/FAQ')
		res.write("<div>Why are you here?</div>");
	else {
		res.write('<form action= "" method="get">');
		res.write('Enter Name<input type="text" name="sname"/><br/>');
		res.write('Enter Email<input type="email" name="email"/><br/>');
		res.write('Password<input type="password" name="password"/><br/>');
		res.write('<input type="submit" value="Send"/></form>');
	}
	
	res.end();
}).listen(8080,function(){
	console.log("server at http://localhost:8080/");
});