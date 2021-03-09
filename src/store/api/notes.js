import axios from 'axios';
import store from '../index';

const baseURL = `${import.meta.env.BASE_URL}api`;
const notesApi = axios.create({
	baseURL: `${baseURL}/notes`,
});

const getAuthHeader = () => `Bearer ${store.state.auth.accessToken}`;

notesApi.interceptors.request.use((config) => {
	if(store.getters.isLoggedIn) {
		config.headers.Authorization = getAuthHeader();
	}

	return config;
});

notesApi.interceptors.response.use(undefined, async (error) => {
	if(error.response?.status !== 401) {
		return Promise.reject(error);
	}

	return store.dispatch('refresh')
		.then(() => {
			error.config.headers.Authorization = getAuthHeader();

			return axios.request(error.config);
		});
});

export default {
	getAll() {
		return notesApi.get('/');
	},

	get(_id) {
		return notesApi.get(`/${_id}`);
	},

	create(data) {
		return notesApi.post('/', data);
	},

	update(_id, data) {
		return notesApi.put(`/${_id}`, data);
	},

	delete(_id) {
		return notesApi.delete(`/${_id}`);
	},
};
