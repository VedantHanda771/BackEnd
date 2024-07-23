const http = require('http');
const fs = require('fs');

http.createServer(function(req,res){
	res.writeHead(200,{'content-type':'text/html'});
	res.write('	<ul><li><a href="http://localhost:8080/">Home</a></li>');
	res.write('	<ul><li><a href="http://localhost:8080/login">Login</a></li>');
	res.write('</ul>');
	res.write(__filename +"<br>");
	res.write(__dirname);
	if(req.url=='/'){
		fs.readFile("home.html", function(err,data){
			if(err)
				throw err;
			return res.end(data);
		});
	}
	else if(req.url=='/login'){
		fs.readFile("login.html", function(err,data){
			if(err)
				throw err;
			return res.end(data);
		});
	}
}).listen(8080,function(){
	console.log("server at 8080");
});