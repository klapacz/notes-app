const low = require('lowdb');
const FileAsync = require('lowdb/adapters/FileAsync');

const adapter = new FileAsync('db.json', {
	defaultValue: [],
});

module.exports = async () => {
	const db = await low(adapter);

	return db;
};
