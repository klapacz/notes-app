import router from '../router';
import api from "./api";

export default {
	state: () => ({
		notes: null,
		edit: null,
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

		async saveNote({ state, commit }, data) {
			try {
				const note = await api.notes.post(data);
				if (state.notes) commit('addNote', note);

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

		async saveEdit({ commit, state }) {
			const { id, ...note } = state.edit.note;

			try {
				await api.notes(id).put(note);

				commit('updateNote', state.edit.note);
				commit('setEdit', state.edit.note);
			} catch (error) {
				console.error(error);
			}
		},

		exitEdit({ commit }) {
			commit('removeEdit');

			router.push({ name: 'notes' });
		},

		// TODO: 404 handling
		async setupForEdit({ commit, getters }, id) {
			let note = getters.getNoteById(id);

			if (note) {
				commit('setEdit', { ...note });
				return;
			}

			try {
				const note = await api.notes(id).get();

				commit('setEdit', note);
			} catch (error) {
				console.error(error);
			}
		}
	},

	getters: {
		getNoteById: (state) => (id) => {
			return state.notes && state.notes.find(todo => todo.id === id);
		},
		isEdited: ({ edit }) => edit.originalContent !== edit.note.content,
	},

	mutations: {
		setNotes(state, notes) {
			state.notes = notes;
		},

		addNote(state, note) {
			state.notes = [note, ...state.notes];
		},

		updateNote(state, note) {
			if (state.notes) {
				state.notes = state.notes.map((candidate) => candidate.id === note.id ? note : candidate);
			}
		},

		deleteNote(state, id) {
			state.notes = state.notes.filter(note => note.id !== id);
		},

		setEdit(state, note) {
			state.edit = { note, originalContent: note.content };
		},

		removeEdit(state) {
			state.edit = null;
		},
	}
};
