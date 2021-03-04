<template>
	<navbar />

	<div class="page-container container my-3">
		<router-view />
	</div>

	<my-footer />
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router';
import Navbar from './components/Navbar.vue';
import MyFooter from './components/MyFooter.vue';

// This starter template is using Vue 3 experimental <script setup> SFCs
// Check out https://github.com/vuejs/rfcs/blob/script-setup-2/active-rfcs/0000-script-setup.md
</script>

<style>
@import "bootstrap";

#app {
	min-height: 100vh;
	display: flex;
	flex-direction: column;
}

.page-container {
	flex-grow: 1;
}
</style>
