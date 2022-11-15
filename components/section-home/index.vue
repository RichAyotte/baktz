<template>
	<section class="section-home">
		<home-tezzomboiz style="grid-area: tezzomboiz" />
		<home-title style="grid-area: title" />
		<home-description style="grid-area: description" />
	</section>
	<section class="section-earnings">
		<h1> Current APY 5.5% </h1> <!-- This of course can be pulled from where ever. -->
	</section>
</template>

<script setup lang="ts">
import homeTezzomboiz from './home-tezzomboiz'
import homeTitle from './home-title'
import homeDescription from './home-description'

</script>

<style lang="scss" scoped>
@import 'include-media';

.section-earnings {
	text-align: center;
	margin-top: 10%;
}

h1 {
		color: white;
		font-size: clamp(2rem, 10vw, 4rem);

		img {
			display: inline-block;
			vertical-align: text-bottom;
			height: clamp(3rem, 15vw, 5rem);
			vertical-align: middle;
		}
	}

.section-home {
	align-items: center;
	display: grid;
	gap: 50px 10px;
	grid-template-areas:
		'tezzomboiz'
		'title'
		'description';
	grid-template-columns: minmax(0, auto);

	@include media('>=tablet') {
		grid-template-areas:
			'tezzomboiz title'
			'description description';
		grid-template-columns: 1fr 1fr;
	}
	@include media('>=desktop') {
		grid-template-areas:
			'tezzomboiz title'
			'tezzomboiz description';
		grid-template-columns: 1fr 1fr;
	}
}
</style>
