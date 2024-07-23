const http= require('http');
const urlmod= require('url');
http.createServer(function(req,res){
	const parsedUrl =urlmod.parse(req.url,true);
	res.writeHead(200,{'content-type':'text/html'});
	
	res.write(req.url);
	res.write(parsedUrl.hostname+"<br>");
	res.write(parsedUrl.port+"<br>");
	res.write(parsedUrl.search+"<br>");
	res.write(parsedUrl.href+"<br>");
	res.end();
	
}).listen(8090,function(){
	console.log("server at 8090");
});