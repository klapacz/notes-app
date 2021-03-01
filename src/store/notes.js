import router from '../router';
import api from "./api";

export default {
	state: () => ({
		notes: null,
	}),

	actions: {
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
		getNoteById: (state) => (id) => {
			return state.notes.find(todo => todo.id === id)
		}
	},

	mutations: {
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
};
