<template>
	<nav class="navbar navbar-dark bg-dark">
		<div class="container">
			<router-link
				to="/"
				class="navbar-brand"
			>
				Notes
			</router-link>
			<div class="d-flex">
				<div id="navbar-settings" />
				<btn-loading
					v-if="isLoged || isLoading"
					:is-loading="isLoading"
					class="btn btn btn-outline-light"
					@click="logout"
				>
					Logout
				</btn-loading>
			</div>
		</div>
	</nav>
</template>

<script setup>
import { computed, ref } from 'vue';
import { RouterLink } from 'vue-router';
import { useStore } from 'vuex';
import BtnLoading from './BtnLoading.vue';

const store = useStore();

const isLoged = computed(() => store.getters.isLoged);
const isLoading = ref(false);

const logout = async () => {
	isLoading.value = true;
	await store.dispatch('logout');
	isLoading.value = false;
};
</script>
