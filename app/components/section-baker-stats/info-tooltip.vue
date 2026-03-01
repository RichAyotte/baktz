<template>
	<span class="info-tooltip-wrapper">
		<button
			ref="iconRef"
			class="info-icon"
			:aria-label="`Info: ${text}`"
			:aria-expanded="visible"
			:aria-describedby="tooltipId"
			@mouseenter="onMouseEnter"
			@mouseleave="onMouseLeave"
			@click.stop="toggle"
		>
			i
		</button>
		<Teleport to="body">
			<Transition name="tooltip-fade">
				<div
					v-if="visible"
					:id="tooltipId"
					ref="bubbleRef"
					role="tooltip"
					class="info-bubble"
					:style="bubbleStyle"
					@mouseenter="onMouseEnter"
					@mouseleave="onMouseLeave"
				>
					{{ text }}
				</div>
			</Transition>
		</Teleport>
	</span>
</template>

<script setup lang="ts">
const props = defineProps<{
	text: string
}>()

const tooltipId = useId()
const visible = ref(false)
const iconRef = ref<HTMLButtonElement>()
const bubbleRef = ref<HTMLElement>()
const bubbleStyle = ref<Record<string, string>>({})

let hoverTimeout: ReturnType<typeof setTimeout> | undefined

function updatePosition() {
	if (!iconRef.value) return
	const rect = iconRef.value.getBoundingClientRect()
	bubbleStyle.value = {
		top: `${rect.bottom + 6 + window.scrollY}px`,
		left: `${rect.left + rect.width / 2 + window.scrollX}px`,
	}
}

function onMouseEnter() {
	clearTimeout(hoverTimeout)
	hoverTimeout = setTimeout(() => {
		updatePosition()
		visible.value = true
	}, 100)
}

function onMouseLeave() {
	clearTimeout(hoverTimeout)
	hoverTimeout = setTimeout(() => {
		visible.value = false
	}, 100)
}

function toggle() {
	updatePosition()
	visible.value = !visible.value
}

function onDocumentClick(e: MouseEvent) {
	if (!visible.value) return
	const target = e.target as Node
	if (iconRef.value?.contains(target)) return
	if (bubbleRef.value?.contains(target)) return
	visible.value = false
}

onMounted(() => {
	document.addEventListener('click', onDocumentClick)
})

onUnmounted(() => {
	document.removeEventListener('click', onDocumentClick)
	clearTimeout(hoverTimeout)
})
</script>

<style scoped>
.info-tooltip-wrapper {
	position: relative;
	display: inline-flex;
	align-items: center;
}

.info-icon {
	all: unset;
	display: inline-flex;
	align-items: center;
	justify-content: center;
	width: 14px;
	height: 14px;
	border-radius: 50%;
	border: 1px solid currentColor;
	font-family: Georgia, 'Times New Roman', serif;
	font-style: italic;
	font-size: 10px;
	line-height: 1;
	color: var(--color-text-muted);
	opacity: 0.5;
	cursor: pointer;
	transition: opacity 0.2s ease;
	margin-left: 5px;
	flex-shrink: 0;
}

.info-icon:hover,
.info-icon:focus-visible {
	opacity: 1;
}
</style>

<style>
.info-bubble {
	position: absolute;
	transform: translateX(-50%);
	max-width: 220px;
	width: max-content;
	padding: 10px 12px;
	background: var(--color-bg-surface);
	border: 1px solid color-mix(in srgb, var(--color-text-muted) 20%, transparent);
	border-radius: 8px;
	box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
	font-size: 0.75rem;
	font-weight: 400;
	line-height: 1.5;
	color: var(--color-text-muted);
	text-transform: none;
	letter-spacing: normal;
	z-index: 9999;
}

.tooltip-fade-enter-active,
.tooltip-fade-leave-active {
	transition:
		opacity 0.2s ease,
		transform 0.2s ease;
}

.tooltip-fade-enter-from,
.tooltip-fade-leave-to {
	opacity: 0;
}
</style>
