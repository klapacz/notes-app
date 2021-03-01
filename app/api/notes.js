const express = require('express');
const shortid = require('shortid');
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
			const note = {
				id: shortid.generate(),
				...req.body
			};

			await userNotes(req.user.name)
				.unshift(note)
				.write();

			return res.status(201).send(note);
		})

	router
		.route('/:id')
		.get(async (req, res) => {
			const id = req.params.id;
			const note = await userNotes(req.user.name)
				.find({ id })
				.value();

			if (note) {
				return res.send(note);
			}

			return res.status(404).send();
		})
		.put(async (req, res) => {
			const id = req.params.id;
			const note = await userNotes(req.user.name)
				.find({ id })
				.assign(req.body)
				.write();

			if (note) {
				return res.send(note);
			}

			return res.status(404).send();
		})
		.delete(async (req, res) => {
			const id = req.params.id;
			const note = await userNotes(req.user.name)
				.remove({ id })
				.write();

			if (note) {
				return res.status(200).send({
					status: 'ok',
				});
			}

			return res.status(204).send();
		})

	return router;
};
