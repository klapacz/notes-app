<template>
	<teleport to="body">
		<div class="modal fade show d-block" role="dialog">
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-header">
						<h5 class="modal-title">Confirm deletion</h5>
						<button @click="$emit('close')" type="button" class="btn-close"></button>
					</div>
					<div class="modal-body">
						<p>Do you really want remove note "{{ props.note.title }}"?</p>
					</div>
					<div class="modal-footer">
						<button @click="$emit('close')" type="button" class="btn btn-secondary">Close</button>
						<btn-loading @click="deleteNote" :is-loading="isLoading" class="btn btn-danger">Delete</btn-loading>
					</div>
				</div>
			</div>
		</div>
		<div class="modal-backdrop fade show"></div>
	</teleport>
</template>

<script setup>
import { defineEmit, defineProps, ref } from "vue";
import { useStore } from "vuex";
import BtnLoading from "./BtnLoading.vue";

const emit = defineEmit(["close"]);
const props = defineProps(["note"]);

const isLoading = ref(false);
const store = useStore();

const deleteNote = async () => {
	isLoading.value = true;
	await store.dispatch("deleteNote", props.note.id);
	isLoading.value = false;
	emit('close');
};
</script>
