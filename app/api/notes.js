const express = require('express');
const router = express.Router();
const { ObjectId } = require('mongodb');

// TODO: return 404 if not found
module.exports = db => {
	router
		.route('/')
		.get(async (req, res) => {
			const { _id: user_id } = req.user;

			const notes = await db.notes
				.find({ user_id: ObjectId(user_id) }, { content: 0 })
				.toArray();

			res.send(notes);
		})
		.post(async (req, res) => {
			// TODO validation
			const { _id: user_id } = req.user;

			const result = await db.notes.insertOne({ ...req.body, user_id: ObjectId(user_id) });

			// return inserted
			return res.status(201).send(result.ops[0]);
		});

	router
		.route('/:_id')
		.get(async (req, res) => {
			const { _id: user_id } = req.user;
			const { _id } = req.params;

			const note = await db.notes.findOne({
				$and: [{ user_id: ObjectId(user_id) }, { _id: ObjectId(_id) }],
			});

			return res.send(note);
		})
		.put(async (req, res) => {
			const { _id: user_id } = req.user;
			const { _id } = req.params;
			
			delete req.body.user_id;

			await db.notes.updateOne({
				$and: [{ user_id: ObjectId(user_id) }, { _id: ObjectId(_id) }],
			}, {
				$set: req.body,
			});

			return res.status(200).send({
				status: 'updated',
			});
		})
		.delete(async (req, res) => {
			const { _id: user_id } = req.user;
			const { _id } = req.params;

			await db.notes.deleteOne({
				$and: [{ user_id: ObjectId(user_id) }, { _id: ObjectId(_id) }],
			});

			return res.status(200).send({
				status: 'deleted',
			});
		});

	return router;
};
