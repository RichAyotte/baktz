<template>
	<div
		ref="cardRef"
		class="stat-card gradient-box-border"
		:class="{ 'has-tooltip': tooltip, 'tooltip-active': visible }"
		v-bind="tooltip ? {
			tabindex: 0,
			'aria-describedby': tooltipId,
		} : {}"
		@mouseenter="tooltip && onMouseEnter()"
		@mouseleave="tooltip && onMouseLeave()"
		@click="tooltip && toggle($event)"
		@focusin="tooltip && onFocus()"
		@focusout="tooltip && onBlur()"
	>
		<span class="stat-label">{{ label }}</span>
		<span class="stat-value">
			<span v-if="prefix" class="stat-prefix">{{ prefix }}</span>
			{{ value }}
		</span>
		<span v-if="subtitle" class="stat-subtitle">{{ subtitle }}</span>
	</div>
	<Teleport v-if="tooltip" to="body">
		<Transition name="tooltip-fade">
			<div
				v-if="visible"
				:id="tooltipId"
				ref="bubbleRef"
				role="tooltip"
				class="info-bubble"
				:style="bubbleStyle"
				@mouseenter="cancelHide"
				@mouseleave="onMouseLeave"
			>
				<svg class="info-bubble-icon" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
					<path d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1Zm0 3a1 1 0 1 1 0 2 1 1 0 0 1 0-2Zm1 8H7V7h2v5Z" />
				</svg>
				{{ tooltip }}
			</div>
		</Transition>
	</Teleport>
</template>

<script setup lang="ts">
defineProps<{
	label: string
	value: string
	prefix?: string
	tooltip?: string
	subtitle?: string
}>()

const cardRef = ref<HTMLElement>()
const {
	visible,
	tooltipId,
	bubbleRef,
	bubbleStyle,
	onMouseEnter,
	onMouseLeave,
	cancelHide,
	onFocus,
	onBlur,
	toggle,
} = useCardTooltip(cardRef)
</script>

<style scoped>
.stat-card {
	padding: 20px 24px;
	display: flex;
	flex-direction: column;
	gap: 8px;
}

@media (hover: none) {
	.stat-card.has-tooltip {
		cursor: pointer;
		-webkit-tap-highlight-color: transparent;
	}
}

@media (hover: hover) {
	.stat-card.has-tooltip:hover {
		box-shadow: 0 0 12px color-mix(in srgb, var(--color-primary) 20%, transparent);
	}
}

.stat-card.tooltip-active {
	border-color: var(--color-accent-cyan);
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
