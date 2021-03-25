const express = require('express');
const jwtExpress = require('express-jwt');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();
const { ObjectId } = require('mongodb');

const jwtMiddleware = jwtExpress({
	secret: process.env.ACCESS_TOKEN_SECRET,
	algorithms: ['HS256'],
});

const authRouter = db => {
	const generateTokens = async (user) => {
		const payload = {
			_id: user._id,
		};

		const options = {
			algorithm: 'HS256',
		};

		const tokens = {
			accessToken: jwt.sign(
				payload,
				process.env.ACCESS_TOKEN_SECRET,
				{ ...options, expiresIn: '30m' },
			),

			refreshToken: jwt.sign(
				payload,
				process.env.REFRESH_TOKEN_SECRET,
				{ ...options, expiresIn: '30d' },
			),
		};

		await db.tokens.insertOne({
			token: tokens.refreshToken,
			user_id: user._id,
		});

		return tokens;
	};

	router.post('/login', async (req, res) => {
		const { name, password } = req.body;

		const user = await db.users.findOne({ name });

		if (!user || !await bcrypt.compare(password, user.password)) {
			return res.sendStatus(401);
		}

		const tokens = await generateTokens(user);

		res.send(tokens);
	});

	router.post('/refresh', async (req, res) => {
		const refreshToken = req.body.token;
		let decoded;

		try {
			decoded = jwt.verify(
				refreshToken,
				process.env.REFRESH_TOKEN_SECRET,
			);
		} catch(error) {
			return res.sendStatus(401);
		}

		const storedToken = await db.tokens.findOne({ token: refreshToken });

		if (!storedToken) {
			return res.sendStatus(401);
		}

		await db.tokens.deleteOne({ _id: storedToken._id });

		const user = await db.users.findOne({ _id: ObjectId(decoded._id) });
		const tokens = await generateTokens(user);

		res.send(tokens);
	});

	router.post('/logout', async (req, res) => {
		const refreshToken = req.body.token;

		await db.tokens.deleteOne({ token: refreshToken });

		res.sendStatus(200);
	});

	return router;
};

module.exports = { jwtMiddleware, authRouter };
