<template>
	<div class="feature-box">
		<header>{{ title }}</header>
		<div
			class="icon"
			:style="{
				maskImage: `url(${iconUrl})`,
			}"
		></div>
		<p>{{ description }}</p>
	</div>
</template>

<script setup lang="ts">
defineProps<{
	title: string
	description: string
	iconUrl: string
}>()
</script>

<style lang="scss" scoped>
.feature-box {
	text-align: center;
}

header {
	text-align: center;
	font-weight: bold;
	text-transform: uppercase;
}

.icon {
	background-image: linear-gradient(
		#7c9874 21.875%,
		#82ad95 45.3125%,
		#8eafa4 65.1042%,
		#bda4ae 85.4167%,
		#deacad 100%
	);
	display: inline-block;
	height: 5rem;
	margin: 1rem;
	mask-position: center;
	mask-repeat: no-repeat;
	width: 5rem;
}
</style>
