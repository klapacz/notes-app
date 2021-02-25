const express = require('express');
const router = express.Router();

module.exports = db => {
	router.get('/', async (req, res) => {
		const val = await db
			.map(user => {
				delete user.password;
				return user
			})
			.value();

		res.smartSend(val);
	})

	return router;
}
