const Datastore = require('nedb-promises');
const path = require('path');

module.exports = async () => {
	const options = {
		autoload: true,
		timestampData: true,
	};

	return {
		users: new Datastore({
			...options,
			filename: path.resolve(`${process.env.DB_DIR}/users.db`),
		}),
		notes: new Datastore({
			...options,
			filename: path.resolve(`${process.env.DB_DIR}/notes.db`),
		}),
	};
};
