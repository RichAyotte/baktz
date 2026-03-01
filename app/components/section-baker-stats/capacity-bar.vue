<template>
	<div
		ref="cardRef"
		class="capacity-bar gradient-box-border"
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
	percentage: number
	free: string
	barColor: string
	tooltip?: string
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
.capacity-bar {
	padding: 20px 24px;
	display: flex;
	flex-direction: column;
	gap: 10px;
}

@media (hover: none) {
	.capacity-bar.has-tooltip {
		cursor: pointer;
		-webkit-tap-highlight-color: transparent;
	}
}

@media (hover: hover) {
	.capacity-bar.has-tooltip:hover {
		box-shadow: 0 0 12px color-mix(in srgb, var(--color-primary) 20%, transparent);
	}
}

.capacity-bar.tooltip-active {
	border-color: var(--color-accent-cyan);
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
