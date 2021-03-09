<template>
	<editor
		:note="note"
		@save="createNote"
	/>

	<teleport to="#navbar-settings">
		<btn-loading
			:is-loading="isLoading"
			class="btn btn-success me-1"
			@click="createNote"
		>
			Save
		</btn-loading>
	</teleport>
</template>

<script setup>
import { reactive, ref } from 'vue';
import { useStore } from 'vuex';
import BtnLoading from '/src/components/BtnLoading.vue';
import Editor from '/src/components/Editor.vue';

const store = useStore();

const note = reactive({
	title: '',
	content: '# hello',
});

const isLoading = ref(false);

const createNote = async () => {
	// TODO: Show error
	if (!note.title) {
		return;
	}

	isLoading.value = true;
	await store.dispatch('createNote', note);
	isLoading.value = false;
};
</script>
