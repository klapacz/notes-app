const express = require('express');
const router = express.Router();
const notesRouter = require('./notes');
const { jwtMiddleware, authRouter } = require('./auth');

module.exports = db => {
	router.use('/auth', authRouter(db));
	router.use('/notes', jwtMiddleware, notesRouter(db));

	return router;
};
