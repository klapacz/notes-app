const express = require('express');
const jwt = require('express-jwt');
const bcrypt = require('bcrypt');
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

		const user = await db.users.findOne({ name });

		if (!user || !await bcrypt.compare(password, user.password)) {
			return res.status(401).send();
		}

		const token = sign(
			{ _id: user._id },
			keys.private,
			{ algorithm: 'RS256' },
		);

		res.send({ token })
	});

	router.get('/', async (req, res) => {
		const users = await db.users.find({}, { name: 1, }).exec()

		res.send(users);
	});

	router.use('/notes', notesRouter(db));

	return router;
}
