const express = require('express');
const path = require('path');
const app = express();

const apiRouter = require('./api');
const helpers = require('./helpers');

const port = process.env.PORT || 3000;
const distPath = path.resolve(__dirname, '../dist');

app.response.smartSend = helpers.smartSend;

(async () => {
	const db = await require('./db')();

	app.use('/api', apiRouter(db));

	app.use(express.static(distPath));

	app.get('*', (req, res) => {
		res.sendFile(path.join(distPath, 'index.html'));
	});

	app.listen(
		port,
		() => console.log(`app listening on port ${port}`)
	);
})();
