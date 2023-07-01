<template>
	<section class="section-about">
		<h2>
			About
			<nuxt-img
				alt="Baktz logo"
				class="text-logo"
				loading="lazy"
				src="baktz-logo.svg"
			/>
		</h2>
		<div id="section-about-content">
			<nuxt-img
				alt="Photo of Richard Ayotte"
				id="headshot"
				loading="lazy"
				src="headshot.webp"
				style="grid-area: headshot"
			/>
			<p style="grid-area: description">
				<nuxt-img
					alt="Baktz logo"
					class="text-logo"
					loading="lazy"
					src="baktz-logo.svg"
				/>
				is a <em><strong>Tezos only</strong></em> delegation service started by Rich
				Ayotte. Rich has been baking since July of 2018 and opened his bakery to the
				public during the fall of 2022.
			</p>
			<about-contact-links style="grid-area: links" />
		</div>
	</section>
</template>
<script setup lang="ts">
import aboutContactLinks from './about-contact-links'
</script>

<style lang="scss" scoped>
@import 'include-media';
.section-about {
	margin-top: 20px;
	margin-bottom: 60px;
}

#section-about-content {
	align-items: center;
	display: grid;
	gap: 30px;
	margin: 0 auto;
	grid-template-areas:
		'headshot'
		'description'
		'links';
	grid-template-columns: minmax(0, auto);
	@include media('>=500px') {
		column-gap: 15px;
		row-gap: 0px;
		max-width: 700px;
		grid-template-areas:
			'headshot description'
			'headshot links';
		grid-template-columns: 1fr 1fr;
	}
}

h2 {
	margin-bottom: 60px;
	font-size: 2.5rem;
	.text-logo {
		height: 1em;
	}
}

.text-logo {
	display: inline-block;
	height: 1.1em;
	vertical-align: middle;
}

#headshot {
	border-radius: 5px;
	box-shadow: 10px 10px 5px 0px rgba(0, 0, 0, 0.2);
	margin: 0 auto;
	transform: rotate(-8deg);
	width: clamp(180px, 200px, 100%);
}
</style>
