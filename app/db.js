const low = require('lowdb');
const lodashId = require('lodash-id')
const FileAsync = require('lowdb/adapters/FileAsync');
const yaml = require('js-yaml');

const adapter = new FileAsync('db.yaml', {
	serialize: (array) => yaml.dump(array),
	deserialize: (string) => yaml.load(string),
	defaultValue: [],
})

module.exports = async () => {
	const db = await low(adapter);

	db._.mixin(lodashId);
	// shorter ids
	db._.createId = () => Math.random().toString(36).substring(7);

	return db;
};
