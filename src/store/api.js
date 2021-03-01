import fetchival from 'fetchival';
import store from "./index";

export default {
	get notes() {
		return fetchival('/api/notes', {
			headers: {
				Authorization: `Bearer ${store.state.auth.token}`,
			},
		});
	},

	login: fetchival('/api/login').post,
}
