<template>
	<footer class="mt-auto py-3 bg-light">
		<div class="container">
			<span class="text-muted">Korneliusz Łapacz {{ year }}</span>
		</div>
	</footer>
</template>

<script setup>
const year = new Date().getFullYear();
</script>
