<template>
	<section class="section-home">
		<home-tezzomboiz style="grid-area: tezzomboiz" />
		<home-title style="grid-area: title" />
		<home-description style="grid-area: description" />
	</section>
</template>

<script setup lang="ts">
import homeTezzomboiz from './home-tezzomboiz'
import homeTitle from './home-title'
import homeDescription from './home-description'
</script>

<style lang="scss" scoped>
@import 'include-media';
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
