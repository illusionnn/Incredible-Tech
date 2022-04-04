const express = require('express');
const path = require('path');

const port = process.env.PORT || 3000;

app = express();

app.use(express.static(path.join(__dirname,"../")));

app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, 'index.html'))
});


// routes
app.get('/api/uni_data', (req, res) => {
	res.send([1, 2, 3]);
})

// route parameters
app.get('/api/uni_data/:id', (req, res) => {
	// res.send(req.params);
	// reading query parameters
	res.send(req.query);
})

app.listen(port, () => console.log(`App avaliable on http://localhost:${port}`));