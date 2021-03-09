import axios from 'axios';

const baseURL = `${import.meta.env.BASE_URL}api`;

const authApi = axios.create({
	baseURL: `${baseURL}/auth`,
});

export default {
	login(data) {
		return authApi.post('/login', data);
	},

	refresh(refreshToken) {
		return authApi.post('/refresh', {
			token: refreshToken,
		});
	},

	logout(refreshToken) {
		return authApi.post('/logout', {
			token: refreshToken,
		});
	},
};
 
