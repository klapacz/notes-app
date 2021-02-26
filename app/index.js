const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const yaml = require('js-yaml');
const app = express();

const apiRouter = require('./api');
const helpers = require('./helpers');

const port = process.env.PORT || 4000;
const distPath = path.resolve(__dirname, '../dist');

app.response.smartSend = helpers.smartSend;
app.use(bodyParser.json());

app.use(bodyParser.text({ type: 'yaml' }));
app.use(function (req, res, next) {
	if (req.is('yaml')) {
		req.body = yaml.load(req.body);
	}

	next();
});

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
