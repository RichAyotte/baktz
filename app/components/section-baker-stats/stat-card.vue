<template>
	<div class="stat-card gradient-box-border">
		<span class="stat-label">{{ label }}</span>
		<span class="stat-value">
			<span v-if="prefix" class="stat-prefix">{{ prefix }}</span>
			{{ value }}
		</span>
	</div>
</template>

<script setup lang="ts">
defineProps<{
	label: string
	value: string
	prefix?: string
}>()
</script>

<style scoped>
.stat-card {
	padding: 20px 24px;
	display: flex;
	flex-direction: column;
	gap: 8px;
}

.stat-label {
	font-size: 0.7rem;
	text-transform: uppercase;
	color: var(--color-text-muted);
	letter-spacing: 0.1em;
	font-weight: 600;
}

.stat-value {
	color: var(--color-accent-cyan);
	font-family: 'JetBrains Mono', monospace;
	font-size: 1.1rem;
	font-weight: 600;
}

.stat-prefix {
	color: var(--color-secondary);
}
</style>
