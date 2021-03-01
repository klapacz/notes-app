import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

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
