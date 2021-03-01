import { createStore } from 'vuex';
import router from '../router';
import api from "./api";

export default createStore({
	state: () => ({
		notes: null,
		token: window.localStorage.getItem('token'),
	}),

	actions: {
		async login({ commit }, form) {
			try {
				// TODO: check token signature
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

		async loadNotes({ commit }) {
			try {
				const notes = await api.notes.get();

				commit('setNotes', notes);
			} catch (error) {
				console.error(error);
			}
		},

		async saveNote({ commit }, data) {
			try {
				const note = await api.notes.post(data);
				commit('addNote', note)
				router.push({ name: 'notes' });
			} catch (error) {
				console.error(error);
			}
		},

		async deleteNote({ commit }, id) {
			try {
				await api.notes(id).delete();
				commit('deleteNote', id)
			} catch (error) {
				console.error(error);
			}
		},
	},

	getters: {
		isLoged: (state) => !!state.token,
		getNoteById: (state) => (id) => {
			return state.notes.find(todo => todo.id === id)
		}
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

		setNotes(state, notes) {
			state.notes = notes;
		},

		addNote(state, note) {
			state.notes = [
				note,
				...state.notes,
			]
		},

		deleteNote(state, id) {
			state.notes = state.notes.filter(note => note.id !== id);
		},
	}
});
