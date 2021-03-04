import api from './api';
import router from '../router';

export default {
	state: () => ({
		token: window.localStorage.getItem('token'),
	}),

	actions: {
		async login({ commit }, form) {
			try {
				const { token } = await api.login(form);

				commit('setToken', token);

				router.push({ name: 'notes' });
			} catch (error) {
				const { response } = error;

				if (response.status === 401) return 'Bad login or password';
				return 'Login error';
			}
		},

		async logout({ commit }) {
			// TODO: logout on backend
			commit('removeToken');
			router.push({ name: 'login' });
		},
	},

	getters: {
		isLoged: (state) => !!state.token,
	},

	mutations: {
		setToken(state, token) {
			state.token = token;
			window.localStorage.setItem('token', token);
		},

		removeToken(state) {
			state.token = null;
			window.localStorage.removeItem('token');
		},
	},
};
