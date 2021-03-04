<template>
	<teleport to="body">
		<div
			class="modal fade show d-block"
			role="dialog"
		>
			<div class="modal-dialog">
				<div class="modal-content">
					<!-- TODO: Click away -->
					<div class="modal-header">
						<h5 class="modal-title">
							Confirm deletion
						</h5>
						<button
							type="button"
							class="btn-close"
							@click="$emit('close')"
						/>
					</div>
					<div class="modal-body">
						<p>Do you really want remove note "{{ props.note.title }}"?</p>
					</div>
					<div class="modal-footer">
						<button
							type="button"
							class="btn btn-secondary"
							@click="$emit('close')"
						>
							Close
						</button>
						<btn-loading
							:is-loading="isLoading"
							class="btn btn-danger"
							@click="deleteNote"
						>
							Delete
						</btn-loading>
					</div>
				</div>
			</div>
		</div>
		<div class="modal-backdrop fade show" />
	</teleport>
</template>

<script setup>
import { defineEmit, defineProps, ref } from 'vue';
import { useStore } from 'vuex';
import BtnLoading from './BtnLoading.vue';

const emit = defineEmit(['close']);
const props = defineProps(['note']);

const isLoading = ref(false);
const store = useStore();

const deleteNote = async () => {
	isLoading.value = true;
	await store.dispatch('deleteNote', props.note._id);
	isLoading.value = false;
	emit('close');
};
</script>
