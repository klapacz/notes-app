<template>
	<div ref="container" :style="{ minHeight: `${minHeight}px`}" class="editor">
		<textarea
			placeholder="Type something here..."
			ref="myTextarea"
			v-model="props.note.content"
			class="bg-light"
		></textarea>
		<div v-html="html"></div>
	</div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed, defineProps, watch } from "vue";
import marked from "marked";
import DOMPurify from "dompurify";

const container = ref(null);
const minHeight = ref(0);

const calculateMinSize = () => {
	minHeight.value = container.value.parentElement.clientHeight;
};

onMounted(() => {
	window.addEventListener("resize", calculateMinSize);
	calculateMinSize();
});

onUnmounted(() => {
	window.removeEventListener("resize", calculateMinSize);
});

const props = defineProps({
	note: Object,
});

const tokens = computed(() => marked.lexer(props.note.content));

watch(tokens, (value) => {
	const token = value.find(
		(token) => token.type === "heading" && token.depth === 1
	);

	props.note.title = token && token.text;
});

const html = computed(() => DOMPurify.sanitize(marked.parser(tokens.value)));
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
