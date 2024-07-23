const fs = require('fs');
/*fs.writeFile("e.txt","vansh \n vedant\n viren \n vikas\n",function(err){
	if(err)
		throw err;
	console.log("File created");
});*/

fs.rename("e.txt","emplist.txt",function(err){
	if(err)
		throw err;
	console.log("File renamed");
	
});