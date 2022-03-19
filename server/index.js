const express = require('express');
// const { process } = require('ipaddr.js');
const {readFile} = require('fs');

app = express();

app.get('/', (request, response) => {
	readFile('../index.html', 'utf8', (err, html) => {
	if (err) {
		response.status(500).send("Sorry, out of order");
	}

	response.send(html);
	})
});

app.listen(3000, () => console.log("App avaliable on http://localhost:3000"));