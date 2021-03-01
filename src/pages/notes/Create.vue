<template>
	<div ref="container" :style="{ minHeight: `${minHeight}px`}" class="editor">
		<textarea
			placeholder="Type something here..."
			ref="myTextarea"
			v-model="markdown"
			class="bg-light"
		></textarea>
		<div v-html="html"></div>
	</div>

	<teleport to="#navbar-settings">
		<btn-loading @click="save" :is-loading="isLoading" class="btn btn-success me-1">Save</btn-loading>
	</teleport>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useStore } from "vuex";
import marked from "marked";
import DOMPurify from "dompurify";
import BtnLoading from '/src/components/BtnLoading.vue'

const store = useStore();

const container = ref(null);
const minHeight = ref(0);

const calculateMinSize = () => {
	minHeight.value = container.value.parentElement.clientHeight;
};

onMounted(() => {
	window.addEventListener("resize", calculateMinSize);
	calculateMinSize();
});

const isLoading = ref(false);
const markdown = ref("# hello");

const tokens = computed(() => marked.lexer(markdown.value));

const heading = computed(() => {
	const token = tokens.value.find(
		(token) => token.type === "heading" && token.depth === 1
	);

	if (!token) return null;

	return token.text;
});

const html = computed(() => DOMPurify.sanitize(marked.parser(tokens.value)));

const save = async () => {
	if (!heading.value) {
		return;
	}

	isLoading.value = true;
	await store.dispatch("saveNote", {
		title: heading.value,
		content: markdown.value,
	});
	isLoading.value = false;
};
</script>

<style lang="scss" scoped>
.editor {
	display: flex;
	align-items: stretch;

	> * {
		box-sizing: border-box;
		padding: 1rem;
		width: 50%;
	}
}

textarea {
	border: none;
	resize: none;
	outline: none;
	font-size: 14px;
	font-family: "Monaco", courier, monospace;
}
</style>
