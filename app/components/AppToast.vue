<template>
	<div
		v-if="toasts.length"
		class="toast-container"
	>
		<div
			v-for="toast in toasts"
			:key="toast.id"
			class="toast"
			@click="dismissToast(toast.id)"
		>
			<strong>{{ toast.title }}</strong>
			<span>{{ toast.text }}</span>
		</div>
	</div>
</template>

<script setup lang="ts">
import { useToast } from '~/composables/useToast'

const { toasts, dismissToast } = useToast()
</script>

<style scoped>
.toast-container {
	position: fixed;
	top: 10px;
	left: 50%;
	transform: translateX(-50%);
	z-index: 9999;
	display: flex;
	flex-direction: column;
	gap: 8px;
}

.toast {
	background-color: var(--color-primary);
	border-radius: 3px;
	box-shadow: 0 0 3px 3px rgba(255, 255, 255, 0.2);
	color: var(--color-bg);
	cursor: pointer;
	display: flex;
	flex-direction: column;
	padding: 10px 20px;
	text-align: center;
}
</style>
