<template>
	<router-link :to="{ name: 'notes.create' }" class="btn btn-success me-1">Create</router-link>
	<btn-loading :is-loading="isLoading" @click="loadNotes">Reload</btn-loading>

	<div class="mt-3">
		<div v-if="notes" class="card">
			<ul class="list-group list-group-flush">
				<li v-for="note in notes" class="list-group-item" :key="note.id">
					<div class="d-flex justify-content-between align-items-center">
						<span v-html="render(note.title)" class="note-title"></span>

						<div class="btn-group" role="group">
							<router-link
								:to="{ name: 'notes.edit', params: { id: note.id }, }"
								class="btn btn-primary"
							>Edit</router-link>
							<button @click="noteToDelete = note" class="btn btn-danger">Delete</button>
						</div>
					</div>
				</li>
			</ul>
		</div>

		<div v-else-if="isLoading" class="alert alert-primary" role="alert">Loading…</div>

		<div v-else class="alert alert-danger" role="alert">Something went wrong</div>
	</div>

	<delete-modal v-if="noteToDelete" @close="noteToDelete = null" :note="noteToDelete"></delete-modal>
</template>

<script setup>
import { RouterLink } from "vue-router";
import BtnLoading from "/src/components/BtnLoading.vue";
import DeleteModal from "/src/components/DeleteModal.vue";
import { useStore } from "vuex";
import { computed, ref, useContext, watch } from "vue";
import DOMPurify from "dompurify";
import marked from "marked";

const store = useStore();
const isLoading = ref(false);
const notes = computed(() => store.state.notes.notes);

const loadNotes = async () => {
	isLoading.value = true;
	await store.dispatch("loadNotes");
	isLoading.value = false;
};

const render = (md) => DOMPurify.sanitize(marked(md));

if (!notes.value) loadNotes();

const noteToDelete = ref(null);

useContext();
</script>

<style lang="scss">
.note-title {
	> p {
		margin: 0 !important;
	}
}
</style>
