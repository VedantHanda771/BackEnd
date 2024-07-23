const fs = require('fs');
fs.appendFileSync("user.txt"," vikas gnadu",function(err){
	if(err)
		throw err;
	console.log("content appended");
});