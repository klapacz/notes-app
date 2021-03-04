require('dotenv-flow').config();

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

const apiRouter = require('./api');

const port = process.env.PORT;
const baseURL = process.env.BASE_URL;
const distPath = path.resolve(__dirname, '../dist');

app.use(bodyParser.json());

(async () => {
	const db = await require('./db')();

	app.use(`${baseURL}api`, apiRouter(db));

	app.use(baseURL, express.static(distPath));

	app.get('*', (req, res) => {
		res.sendFile(path.join(distPath, 'index.html'));
	});

	app.listen(
		port,
		() => console.log(`app listening on port ${port}`),
	);
})();
