const MongoClient = require('mongodb').MongoClient;

module.exports = async () => {
	const client = await MongoClient.connect(process.env.DB_URL);
	const db = client.db(process.env.DB_NAME);

	return {
		users: db.collection('users'),
		notes: db.collection('notes'),
		tokens:db.collection('tokens'),
	};
};
