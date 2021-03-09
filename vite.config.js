import { defineConfig } from 'vite';
import dotenv from 'dotenv-flow';
import vue from '@vitejs/plugin-vue';
import vueSvgPlugin from 'vite-plugin-vue-svg';

// vite loads .env only to app source
dotenv.config();

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [vue(), vueSvgPlugin()],
	base: process.env.BASE_URL,
	server: {
		proxy: {
			'/api': 'http://localhost:4000/',
		},
	},
});
