const express = require('express');
// const { process } = require('ipaddr.js');
const {readFile} = require('fs');
const path = require('path');

app = express();

app.use(express.static(path.join(__dirname,"/src")));

app.get('/', (request, response) => {
	readFile('../index.html', 'utf8', (err, html) => {
	if (err) {
		response.status(500).send("Sorry, out of order");
	}

	response.send(html);
	})
});

app.listen(3000, () => console.log("App avaliable on http://localhost:3000"));