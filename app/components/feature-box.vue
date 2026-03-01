<template>
	<div class="feature-box">
		<template v-if="stat">
			<div
				class="icon"
				:style="{
					maskImage: `url(${iconUrl})`,
					aspectRatio: aspectRatio ?? '1/1',
				}"
			/>
			<div class="stat">{{ stat }}</div>
			<div class="stat-label">{{ statLabel }}</div>
			<header>{{ title }}</header>
		</template>
		<template v-else>
			<header>{{ title }}</header>
			<div
				class="icon"
				:style="{
					maskImage: `url(${iconUrl})`,
					aspectRatio: aspectRatio ?? '1/1',
				}"
			/>
		</template>
		<p v-html="description" />
	</div>
</template>

<script setup lang="ts">
defineProps<{
	title: string
	description: string
	iconUrl: string
	aspectRatio?: string
	stat?: string
	statLabel?: string
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

.stat + .stat-label + header {
	margin-bottom: 0.75rem;
}

p {
	font-size: 1rem;
	color: var(--color-text-muted);
	line-height: 1.5;
	margin: 0;
}

:deep(a) {
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

.stat {
	font-family: "JetBrains Mono", monospace;
	font-size: 2.5rem;
	font-weight: 700;
	color: var(--color-accent-cyan);
	line-height: 1.1;
}

.stat-label {
	font-size: 0.9rem;
	color: var(--color-text-muted);
	margin-bottom: 1.25rem;
}
</style>
