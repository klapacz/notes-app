import api from './api';
import router from '../router';

export default {
	state: () => ({
		accessToken: window.localStorage.getItem('access-token'),
		refreshToken: window.localStorage.getItem('refresh-token'),
	}),

	actions: {
		async login({ commit }, form) {
			try {
				const response = await api.auth.login(form);

				commit('setTokens', response.data);

				router.push({ name: 'notes' });
			} catch (error) {
				if (error.response.status === 401) {
					return 'Bad login or password';
				}

				return 'Login error';
			}
		},
		
		async refresh({ commit, state }) {
			try {
				const response = await api.auth.refresh(state.refreshToken);
				
				commit('setTokens', response.data);
			} catch(error) {
				commit('removeTokens');
				router.push({ name: 'login' });
			}
		},

		async logout({ commit, state }) {
			try {
				await api.auth.logout(state.refreshToken);
			} catch (error) {
				console.error('logging out error: ', error);
			} finally {
				commit('removeTokens');
				commit('setNotes', null);
				router.push({ name: 'login' });
			}
		},
	},

	getters: {
		isLoggedIn: (state) => !!state.accessToken,
	},

	mutations: {
		setTokens(state, { accessToken, refreshToken }) {
			state.accessToken = accessToken;
			state.refreshToken = refreshToken;

			window.localStorage.setItem('access-token', accessToken);
			window.localStorage.setItem('refresh-token', refreshToken);
		},

		removeTokens(state) {
			state.accessToken = null;
			state.refreshToken = null;

			window.localStorage.removeItem('access-token');
			window.localStorage.removeItem('refresh-token');
		},
	},
};
