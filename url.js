const url= require('url');

const weburl="http://localhost:8080/index.js?name=sunilKumar&dob=12-12-22";
let parsedUrl= url.parse(weburl, true);

console.log(parsedUrl.hostname);
console.log(parsedUrl.port);
console.log(parsedUrl.search);
let queryobj = parsedUrl.query;
console.log(queryobj.name);
console.log(queryobj.dob);
