import fetchival from 'fetchival';
import store from './index';

const apiURL = `${import.meta.env.BASE_URL}api`;

export default {
	get notes() {
		return fetchival(`${apiURL}/notes`, {
			headers: {
				Authorization: `Bearer ${store.state.auth.token}`,
			},
		});
	},

	login: fetchival(`${apiURL}/login`).post,
};
