var fs = require('fs');
fs.writeFile('user.txt','vansh lorhu',function(err){
	if(err)
		throw err;
	console.log('saved');
});