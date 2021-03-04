<template>
	<form @submit.prevent="submitForm">
		<h1>Login</h1>

		<div
			v-if="error"
			class="alert alert-danger mt-3"
		>
			{{ error }}
		</div>

		<div class="mb-3">
			<label
				for="name"
				class="form-label"
			>Username</label>
			<input
				id="name"
				v-model="form.name"
				class="form-control"
			>
		</div>
		<div class="mb-3">
			<label
				for="password"
				class="form-label"
			>Password</label>
			<input
				id="password"
				v-model="form.password"
				type="password"
				class="form-control"
			>
		</div>

		<btn-loading
			type="submit"
			:is-loading="isLoading"
		>
			Login
		</btn-loading>
	</form>
</template>

<script setup>
import { reactive, ref } from 'vue';
import { useStore } from 'vuex';
import BtnLoading from '../components/BtnLoading.vue';

const store = useStore();

const form = reactive({
	name: '',
	password: '',
});

const error = ref();
const isLoading = ref(false);

const submitForm = async () => {
	if (!form.name.length || !form.password.length) {
		error.value = 'Password and login cannot be empty';
		return;
	}

	isLoading.value = true;
	error.value = await store.dispatch('login', form);
	isLoading.value = false;
};
</script>

<style scoped>
form {
	max-width: 30rem;
	margin: auto;
}

button[type="submit"] {
	width: 100%;
}
</style>
