const express = require('express');
const router = express.Router();

// TODO: return 404 if not found
module.exports = db => {
	router
		.route('/')
		.get(async (req, res) => {
			const { _id: user_id } = req.user;

			const notes = await db.notes.find({ user_id }, { content: 0 });
			res.send(notes);
		})
		.post(async (req, res) => {
			// TODO validation
			const { _id: user_id } = req.user;

			const note = await db.notes.insert({ ...req.body, user_id });

			return res.status(201).send(note);
		})

	router
		.route('/:_id')
		.get(async (req, res) => {
			const { _id: user_id } = req.user;
			const { _id } = req.params;

			const note = await db.notes.findOne({
				$and: [{ user_id }, { _id }]
			});

			return res.send(note);
		})
		.put(async (req, res) => {
			const { _id: user_id } = req.user;
			const { _id } = req.params;

			await db.notes.update({
				$and: [{ user_id }, { _id }]
			}, req.body);

			return res.status(200).send({
				status: 'updated',
			});
		})
		.delete(async (req, res) => {
			const { _id: user_id } = req.user;
			const { _id } = req.params;

			await db.notes.remove({
				$and: [{ user_id }, { _id }]
			});

			return res.status(200).send({
				status: 'deleted',
			});
		})

	return router;
};
