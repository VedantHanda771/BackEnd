var http = require('http');
http.createServer(function(req,res){
	res.writeHead(200,{'content-type':"text/html"});
	res.write ("hello world <br/>");
	res.end("Welcome to My Website"); //in re.end(we can send pas var or msg
}).listen(8080,function(){
	console.log("Server running at port number http://localhost:8080/");
});