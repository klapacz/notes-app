const yaml = require('js-yaml');

function smartSend(val) {
	if (this.req.query.yaml) {
		return this
			.type('yaml')
			.send(yaml.dump(val));
	}

	this.send(val);
}

module.exports = {
	smartSend,
}
