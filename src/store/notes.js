import router from '../router';
import api from './api';

export default {
	state: () => ({
		notes: null,
		edit: null,
	}),

	actions: {
		async getAllNotes({ commit }) {
			const response = await api.notes.getAll();

			commit('setNotes', response.data);
		},

		async createNote({ state, commit }, data) {
			const response = await api.notes.create(data);

			if (state.notes) commit('addNote', response.data);

			router.push({ name: 'notes' });
		},

		async deleteNote({ commit }, _id) {
			await api.notes.delete(_id);
			commit('deleteNote', _id);
		},

		async updateNote({ commit, state }) {
			const { _id, ...note } = state.edit.note;

			await api.notes.update(_id, note);

			commit('updateNote', state.edit.note);
			commit('setEdit', state.edit.note);
		},

		exitEdit({ commit }) {
			commit('removeEdit');

			router.push({ name: 'notes' });
		},

		// TODO: 404 handling
		async setupForEdit({ commit, getters }, _id) {
			const response = await api.notes.get(_id);

			commit('setEdit', response.data);
		},
	},

	getters: {
		getNoteById: (state) => (_id) => {
			return state.notes && state.notes.find(note => note._id === _id);
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
				state.notes = state.notes.map(
					(candidate) => candidate._id === note._id ? note : candidate,
				);
			}
		},

		deleteNote(state, _id) {
			state.notes = state.notes.filter(note => note._id !== _id);
		},

		setEdit(state, note) {
			state.edit = { note, originalContent: note.content };
		},

		removeEdit(state) {
			state.edit = null;
		},
	},
};
