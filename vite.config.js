import { defineConfig } from 'vite'
import dotenv from 'dotenv-flow'
import vue from '@vitejs/plugin-vue'

// vite loads .env only to app source
dotenv.config();

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [vue()],
	base: process.env.BASE_URL,
	server: {
		proxy: {
			'/api': 'http://localhost:4000/',
		},
	},
});
