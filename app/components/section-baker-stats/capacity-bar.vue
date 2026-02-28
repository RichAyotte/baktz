<template>
	<div class="capacity-bar gradient-box-border">
		<div class="capacity-header">
			<span class="capacity-label">{{ label }}</span>
			<span class="capacity-free">{{ free }} free</span>
		</div>
		<div class="bar-track">
			<div
				class="bar-fill"
				:style="{ width: `${Math.min(percentage, 100)}%`, background: barColor }"
			/>
		</div>
		<span class="capacity-pct">{{ percentage.toFixed(1) }}%</span>
	</div>
</template>

<script setup lang="ts">
defineProps<{
	label: string
	percentage: number
	free: string
	barColor: string
}>()
</script>

<style scoped>
.capacity-bar {
	padding: 20px 24px;
	display: flex;
	flex-direction: column;
	gap: 10px;
}

.capacity-header {
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.capacity-label {
	font-size: 0.7rem;
	text-transform: uppercase;
	color: var(--color-text-muted);
	letter-spacing: 0.1em;
	font-weight: 600;
}

.capacity-free {
	font-family: 'JetBrains Mono', monospace;
	font-size: 0.85rem;
	color: var(--color-text-muted);
}

.bar-track {
	width: 100%;
	height: 8px;
	border-radius: 4px;
	background: color-mix(in srgb, var(--color-bg-surface) 80%, transparent);
}

.bar-fill {
	height: 100%;
	border-radius: 4px;
	transition: width 0.6s ease;
}

.capacity-pct {
	font-family: 'JetBrains Mono', monospace;
	font-size: 1.1rem;
	font-weight: 600;
	color: var(--color-accent-cyan);
}
</style>
