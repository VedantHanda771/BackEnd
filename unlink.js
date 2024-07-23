const fs = require('fs');
/*fs.writeFile("dummy.txt","this is dummy text",function(err){
	if(err)
		throw err;
	console.log("file created");
});*/

fs.unlink("dummy.txt",function(err){
	if(err)
		throw err;
	console.log("File DELETED");

});