const low = require('lowdb');
const lodashId = require('lodash-id')
const FileAsync = require('lowdb/adapters/FileAsync');

const adapter = new FileAsync('db.json', {
	defaultValue: [],
});

module.exports = async () => {
	const db = await low(adapter);

	db._.mixin(lodashId);
	// shorter ids
	db._.createId = () => Math.random().toString(36).substring(7);

	return db;
};
