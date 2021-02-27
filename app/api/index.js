const express = require('express');
const jwt = require('express-jwt');
const fs = require('fs');
const { sign } = require('jsonwebtoken');
const router = express.Router();
const notesRouter = require('./notes');

const keys = {
	public: fs.readFileSync('public.pem'),
	private: fs.readFileSync('private.pem'),
}

const jwtOptions = {
	secret: keys.public,
	algorithms: ['RS256'],
}

module.exports = db => {
	router.use(
		jwt(jwtOptions).unless({ path: /.*\/login$/ })
	);

	router.post('/login', async (req, res) => {
		const { name, password } = req.body;

		const user = await db.find({ name }).value();

		if (!user || password !== user.password) return res.status(401).send();

		const token = sign(
			{ name },
			keys.private,
			{ algorithm: 'RS256' },
		);

		res.send({ token })
	});

	router.get('/', async (req, res) => {
		const val = await db
			.map(user => user.name)
			.value();

		res.send(val);
	});

	router.use('/notes', notesRouter(db));

	return router;
}
