<template>
	<section class="section-about">
		<div id="section-about-content">
			<nuxt-img
				alt="Photo of Richard Ayotte"
				id="headshot"
				loading="lazy"
				src="headshot.webp"
				style="grid-area: headshot; aspect-ratio: 1/1"
			/>
			<div class="about-text-container" style="grid-area: content">
				<h2>About <baktz-logo size="inherit" /></h2>
				<p>
					<baktz-logo size="1.2rem" /> is a secure, high-performance <a href="https://tezos.com" target="_blank">Tezos</a> baking service.
					Started by <a href="https://richayotte.com" target="_blank">Richard Ayotte</a>, Rich has been baking since July of 2018
					and opened his bakery to the public during the fall of 2022.
				</p>
				<about-contact-links class="contact-links" />
			</div>
		</div>
	</section>
</template>

<script setup lang="ts">
import AboutContactLinks from './about-contact-links.vue'
</script>

<style scoped>
.section-about {
	margin-top: 40px;
	margin-bottom: 80px;
	position: relative;
	padding-top: 40px;
	padding-bottom: 40px;
}

#section-about-content {
	align-items: center;
	display: grid;
	gap: 40px;
	margin: 0 auto;
	position: relative;
	z-index: 1;
	grid-template-areas:
		'headshot'
		'content';
	grid-template-columns: minmax(0, auto);

	@media (width >= 768px) {
		column-gap: 60px;
		max-width: 900px;
		grid-template-areas: 'headshot content';
		grid-template-columns: 1fr 2fr;
	}
}

.about-text-container {
	display: flex;
	flex-direction: column;
	text-align: center;
	
	@media (width >= 768px) {
		text-align: left;
	}
}

h2 {
	margin: 0 0 20px 0;
	font-size: clamp(2.5rem, 5vw, 3.5rem);
	font-weight: 700;
	letter-spacing: -0.03em;
	color: var(--color-text);
}

p {
	font-size: 1.15rem;
	line-height: 1.7;
	color: var(--color-text-muted);
	margin: 0 0 30px 0;

}

.contact-links {
	align-self: center;
	
	@media (width >= 768px) {
		align-self: flex-start;
	}
}

#headshot {
	border-radius: 16px;
	box-shadow: 0 15px 30px rgba(0, 0, 0, 0.3);
	margin: 0 auto;
	transform: rotate(-4deg);
	width: clamp(200px, 100%, 320px);
	transition: transform 0.3s ease;
	
	&:hover {
		transform: rotate(0deg) scale(1.05);
	}
}
</style>
