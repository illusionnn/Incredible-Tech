const http = require('http');
const fs = require('fs');

const hostname = 'localhost';
const port = 3000;

const server = http.createServer((req, res) => {
	res.statusCode = 200;
	fs.readFile('../src/script.js', "utf-8", (err, data) => {
		if (err) {
			console.error("Error reading file");
			return;
		}
		res.writeHead(res.statusCode ,'Content-Type', 'text/javascript');
		res.write(data);
	});
	fs.readFile('../src/style.css', "utf-8", (err, data) => {
		if (err) {
			console.error("Error reading file");
			return;
		}
		res.writeHead(res.statusCode, 'Content-Type', 'text/css');
		res.write(data);
	});
	fs.readFile('../index.html', "utf-8", (err, data) => {
		if (err) {
			console.error("Error reading file");
			return;
		}
		res.setHeader('Content-Type', 'text/html');
		res.end(data);
	});
});

server.listen(port, hostname, () => {
	console.log(`Server running at http://${hostname}:${port}/`);
});