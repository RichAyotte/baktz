<template>
	<div class="feature-box">
		<header>{{ title }}</header>
		<div
			class="icon"
			:style="{
				maskImage: `url(${iconUrl})`,
				aspectRatio,
			}"
		/>
		<p v-html="description" />
	</div>
</template>

<script setup lang="ts">
defineProps<{
	title: string
	description: string
	iconUrl: string
	aspectRatio: string
}>()
</script>

<style scoped>
.feature-box {
	text-align: center;
}

header {
	text-align: center;
	font-weight: 700;
	text-transform: uppercase;
	font-size: 1.1rem;
	letter-spacing: 0.05em;
	margin-bottom: 1.5rem;
	color: var(--color-text);
}

p {
	font-size: 1rem;
	color: var(--color-text-muted);
	line-height: 1.5;
}

:deep(a) {
	color: var(--color-primary);
	font-weight: 600;
}

.icon {
	background-image: linear-gradient(
		135deg,
		var(--color-primary) 0%,
		var(--color-secondary) 100%
	);
	display: inline-block;
	height: 4rem;
	margin: 0 auto 1.5rem auto;
	mask-position: center;
	mask-repeat: no-repeat;
	mask-size: contain;
	width: 4rem;
}
</style>
