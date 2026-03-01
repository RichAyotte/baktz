<template>
	<div class="stat-card gradient-box-border">
		<span class="stat-label">
			{{ label }}
			<InfoTooltip v-if="tooltip" :text="tooltip" />
		</span>
		<span class="stat-value">
			<span v-if="prefix" class="stat-prefix">{{ prefix }}</span>
			{{ value }}
		</span>
		<span v-if="subtitle" class="stat-subtitle">{{ subtitle }}</span>
	</div>
</template>

<script setup lang="ts">
import InfoTooltip from './info-tooltip.vue'

defineProps<{
	label: string
	value: string
	prefix?: string
	tooltip?: string
	subtitle?: string
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

.stat-subtitle {
	font-size: 0.75rem;
	color: var(--color-text-muted);
}
</style>
