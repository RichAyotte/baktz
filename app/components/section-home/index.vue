<template>
	<section class="section-home">
		<div class="hero-glow-wrapper">
			<div class="hero-glow"></div>
		</div>
		<home-title class="hero-content" />
		<home-description class="hero-content" />
	</section>
</template>

<script setup lang="ts">
import HomeDescription from './home-description.vue'
import HomeTitle from './home-title.vue'
</script>

<style scoped>
.section-home {
	position: relative;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	text-align: center;
}

.hero-content {
	position: relative;
	z-index: 10;
	width: 100%;
	max-width: 800px;
	display: flex;
	flex-direction: column;
	align-items: center;
}

.hero-glow-wrapper {
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	width: 60vw;
	height: 60vw;
	max-width: 600px;
	max-height: 600px;
	filter: blur(60px);
	z-index: 0;
}

.hero-glow {
	width: 100%;
	height: 100%;
	background: radial-gradient(
		circle,
		color-mix(in srgb, var(--color-primary) 15%, transparent) 0%,
		color-mix(in srgb, var(--color-secondary) 5%, transparent) 50%,
		transparent 70%
	);
	animation: pulse-glow 8s ease-in-out infinite alternate;
}

@keyframes pulse-glow {
	0% {
		scale: 1;
		opacity: 0.8;
	}
	100% {
		scale: 1.2;
		opacity: 1;
	}
}
</style>
