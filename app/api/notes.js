const express = require('express');
const router = express.Router();


module.exports = db => {
	const userNotes = (name) => db
		.find({ name })
		.get('notes');

	router
		.route('/')
		.get(async (req, res) => {
			const notes = await userNotes(req.user.name)
				.value();

			res.send(notes);
		})
		.post(async (req, res) => {
			const note = await userNotes(req.user.name)
				.insert(req.body)
				.write();

			return res.status(201).send(note.id);
		})

	router
		.route('/:id')
		.get(async (req, res) => {
			const note = await userNotes(req.user.name)
				.getById(req.params.id)
				.value();

			if (note) {
				return res.send(note);
			}

			return res.status(404).send();
		})
		.put(async (req, res) => {
			const note = await userNotes(req.user.name)
				.getById(req.params.id)
				.assign(req.body)
				.write();

			if (note) {
				return res.send(note);
			}

			return res.status(404).send();
		})
		.delete(async (req, res) => {
			const note = await userNotes(req.user.name)
				.removeById(req.params.id)
				.write();

			if (note) {
				return res.status(200).send();
			}

			return res.status(204).send();
		})

	return router;
};
