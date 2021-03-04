const express = require('express');
const jwt = require('express-jwt');
const bcrypt = require('bcrypt');
const { sign } = require('jsonwebtoken');
const router = express.Router();
const notesRouter = require('./notes');

const secret = process.env.SECRET;
const algorithm = 'HS256';

module.exports = db => {
	router.use(
		jwt({ secret, algorithms: [algorithm] }).unless({ path: /.*\/login$/ }),
	);

	router.post('/login', async (req, res) => {
		const { name, password } = req.body;

		const user = await db.users.findOne({ name });

		if (!user || !await bcrypt.compare(password, user.password)) {
			return res.status(401).send();
		}

		const token = sign(
			{ _id: user._id },
			secret,
			{ algorithm },
		);

		res.send({ token });
	});

	router.use('/notes', notesRouter(db));

	return router;
};
