<template>
	<router-link :to="{ name: 'notes.create' }" class="btn btn-success mr-1">Create</router-link>
	<btn-loading :is-loading="isLoading" @click="loadNotes">Reload</btn-loading>

	<div class="mt-3">
		<table v-if="notes" class="table">
			<thead>
				<tr>
					<th scope="col">Name</th>
					<th scope="col">Actions</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="note in notes" :key="note.id">
					<td class="w-75">{{note.title}}</td>
					<td>
						<router-link to="/" class="btn btn-primary mr-1">Edit</router-link>
						<router-link to="/" class="btn btn-danger">Delete</router-link>
					</td>
				</tr>
			</tbody>
		</table>

		<div v-else-if="isLoading" class="alert alert-primary" role="alert">Loading…</div>

		<div v-else class="alert alert-danger" role="alert">Something went wrong</div>
	</div>
</template>

<script setup>
import { RouterLink } from "vue-router";
import BtnLoading from "/src/components/BtnLoading.vue";
import { useStore } from "vuex";
import { computed, ref } from "vue";

const store = useStore();
const isLoading = ref(false);
const notes = computed(() => store.state.notes);

const loadNotes = async () => {
	isLoading.value = true;
	await store.dispatch("loadNotes");
	isLoading.value = false;
};

if (!notes.value) loadNotes();
</script>
