<template>
	<div id="home-title">
		<h1>
			Bake with
			<br/>
			<span class="diamond-text">Diamond Hands</span>
		</h1>
		<p class="tagline">A Tezos Baking Service</p>
	</div>
</template>

<style scoped>
#home-title {
	width: 100%;
	margin-bottom: 3.5rem;

	h1 {
		color: white;
		font-size: clamp(3rem, 8vw, 6.5rem);
		font-weight: 700;
		text-align: center;
		margin: 0;
		line-height: 1.1;
		letter-spacing: -0.03em;
		text-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
	}

	.diamond-text {
		background: linear-gradient(135deg, var(--color-accent-cyan-light) 0%, var(--color-accent-cyan) 25%, var(--color-primary) 100%);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
		filter: drop-shadow(0 4px 20px color-mix(in srgb, var(--color-accent-cyan) 30%, transparent));
	}

	.tagline {
		color: var(--color-text-muted);
		font-size: clamp(1.1rem, 2.5vw, 1.5rem);
		font-weight: 600;
		letter-spacing: 0.05em;
		margin: 1rem 0 0;
		text-align: center;
	}
}
</style>
