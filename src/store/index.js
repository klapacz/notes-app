import { createStore } from 'vuex';
import notes from './notes';
import auth from './auth';

export default createStore({
	modules: {
		notes,
		auth,
	},
});
