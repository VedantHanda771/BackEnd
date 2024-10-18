const fs = require('fs');
const http = require('http');
http.createServer(function(request,response){
	response.writeHead(200,{'content-type':'text/html'});
fs.readFile('user2.txt',function(err,data){
	try{
		if(err)
		throw err;
		return response.end(data);
	}
	catch(err){
		console.log(err);
		response.write("<h1>Error reading file please check the console.</h1>");
	}
	
	
	 
	return response.end("<p>End of the page</p>");
	
});
}).listen(8080,function(){
	console.log("server at 8080");
});