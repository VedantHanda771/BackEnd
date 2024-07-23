const http = require("http");
const fs = require("fs");

const myserver = http.createServer((req, res) => {
    // Create a formatted timestamp string
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const timestamp = `${hours}-${minutes}-${seconds}`;
    const filename = `log_${timestamp}.txt`;
    const log = `${timestamp}: New Data\n`;
    const myurl = url.parse(req.url, true);
    console.log(myurl);


    // Write log data to the new file
    fs.writeFile(`./${filename}`, log, (err) => {
        if (err) {
            console.error("Error writing to file", err);
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end("Error writing to log file");
            return;
        }

        res.writeHead(200, { 'Content-Type': 'text/plain' });

        switch (req.url) {
            case "/":
                res.end("File Created");
                break;
            default:
                res.end("404 Not Found");
        }
    });
});

myserver.listen(8080, () => {
    console.log("Server Started at 8080");
});
