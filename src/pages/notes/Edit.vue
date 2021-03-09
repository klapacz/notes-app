<template>
	<template v-if="note">
		<editor
			:note="note"
			@save="updateNote"
		/>

		<teleport to="#navbar-settings">
			<btn-loading
				:disabled="!isEdited"
				:is-loading="isLoading"
				class="btn btn-success me-1"
				@click="updateNote"
			>
				Update
			</btn-loading>
		</teleport>
	</template>

	<div
		v-else
		class="alert alert-info"
	>
		Loading…
	</div>
</template>

<script setup>
import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
import BtnLoading from '/src/components/BtnLoading.vue';
import Editor from '/src/components/Editor.vue';

const store = useStore();
const route = useRoute();

const isLoading = ref(false);

const updateNote = async () => {
	// TODO: Show error
	if (!note.value.title) {
		return;
	}

	isLoading.value = true;
	await store.dispatch('updateNote');
	isLoading.value = false;
};

const note = computed(
	() => store.state.notes.edit && store.state.notes.edit.note,
);

const isEdited = computed(() => store.getters.isEdited);

store.dispatch('setupForEdit', route.params.id);
</script>
