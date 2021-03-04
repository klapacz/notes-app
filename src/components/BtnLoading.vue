<template>
	<button
		:class="props.class || 'btn btn-primary'"
		:disabled="props.isLoading"
	>
		<div
			v-if="props.isLoading"
			class="spinner-border spinner-border-sm"
			role="status"
		/>
		<slot v-else />
	</button>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
	isLoading: Boolean,
	class: String,
});
</script>

<style scoped>
button {
	min-width: 3rem;
	text-align: center;
}
</style>
