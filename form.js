var http = require('http');
http.createServer(function(req,res){
	res.writeHead(200,{'content-type':"text/html"});
	res.write('<form action= "" method="get">');
	res.write('Enter Name<input type="text" name="sname"/><br/>');
	res.write('Enter Email<input type="email" name="email"/><br/>');
	res.write('Password<input type="password" name="password"/><br/>');
	res.write('<input type="submit" value="Send"/></form>');
	res.end();
	
}).listen(8080,function(){
	console.log("server running at http://localhost:8080/");
});
