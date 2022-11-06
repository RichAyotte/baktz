<template>
	<section class="section-about">
		<h2>
			About
			<img
				class="text-logo"
				src="~/assets/images/baktz-logo.svg"
			/>
		</h2>
		<div id="section-about-content">
			<img
				style="grid-area: headshot"
				id="headshot"
				src="~/assets/images/headshot.jpg"
				alt="Photo of Richard Ayotte"
			/>
			<p style="grid-area: description">
				<img
					class="text-logo"
					src="~/assets/images/baktz-logo.svg"
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
#section-about-content {
	align-items: center;
	display: grid;
	gap: 30px;
	max-width: 300px;
	margin: 0 auto;
	grid-template-areas:
		'headshot'
		'description'
		'links';
	grid-template-columns: minmax(0, auto);
	@include media('>=500px') {
		max-width: 600px;
		grid-template-areas:
			'headshot description'
			'headshot links';
		grid-template-columns: 1fr 1fr;
	}
}
h2 {
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
