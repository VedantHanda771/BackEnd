const fs = require('fs');
const http = require('http');
http.createServer(function(request,response){
	response.writeHead(200,{'content-type':'text/html'});
fs.readFile('user.txt',function(err,data){
	if(err)
		throw err;
	
	 
	return response.end(data);
	
});
}).listen(8080,function(){
	console.log("server at 8080");
});