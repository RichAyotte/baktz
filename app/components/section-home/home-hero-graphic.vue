<template>
	<figure id="home-hero-graphic">
		<div class="glow-orb"></div>
		<div class="glass-card">
			<img
				alt="Baktz logo icon"
				src="/baktz-logo-500x500.png"
				class="floating-logo"
			/>
		</div>
	</figure>
</template>

<style scoped>
#home-hero-graphic {
	margin: 0;
	display: flex;
	justify-content: center;
	align-items: center;
	position: relative;
	min-height: 400px;
}

.glow-orb {
	position: absolute;
	width: 300px;
	height: 300px;
	background: radial-gradient(circle, var(--color-primary) 0%, transparent 70%);
	border-radius: 50%;
	filter: blur(50px);
	opacity: 0.5;
	animation: pulse-orb 6s ease-in-out infinite alternate;
	z-index: 0;
}

.glass-card {
	position: relative;
	z-index: 1;
	width: clamp(250px, 35vw, 400px);
	aspect-ratio: 1 / 1;
	height: auto;
	background: linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.01) 100%);
	border: 1px solid rgba(255, 255, 255, 0.1);
	border-radius: 24px;
	backdrop-filter: blur(20px);
	box-shadow: 0 20px 50px rgba(0, 0, 0, 0.3);
	display: flex;
	justify-content: center;
	align-items: center;
	animation: float-card 8s ease-in-out infinite;
	overflow: hidden;
}

.glass-card::before {
	content: '';
	position: absolute;
	top: -50%;
	left: -50%;
	width: 200%;
	height: 200%;
	background: linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.1), transparent);
	transform: rotate(45deg);
	animation: shimmer 4s linear infinite;
}

.floating-logo {
	width: 60%;
	height: auto;
	filter: drop-shadow(0 0 15px rgba(158, 175, 255, 0.6));
}

@keyframes pulse-orb {
	0% {
		transform: scale(1) translate(0, 0);
		opacity: 0.4;
		background: radial-gradient(circle, var(--color-primary) 0%, transparent 70%);
	}
	50% {
		transform: scale(1.2) translate(10px, -20px);
		opacity: 0.6;
		background: radial-gradient(circle, var(--color-secondary) 0%, transparent 70%);
	}
	100% {
		transform: scale(1) translate(-10px, 10px);
		opacity: 0.4;
		background: radial-gradient(circle, var(--color-primary) 0%, transparent 70%);
	}
}

@keyframes float-card {
	0% {
		transform: translateY(0) rotate(0deg);
	}
	50% {
		transform: translateY(-20px) rotate(2deg);
	}
	100% {
		transform: translateY(0) rotate(0deg);
	}
}

@keyframes shimmer {
	0% {
		transform: translateX(-100%) rotate(45deg);
	}
	100% {
		transform: translateX(100%) rotate(45deg);
	}
}
</style>
