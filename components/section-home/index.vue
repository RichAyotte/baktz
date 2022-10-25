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
	gap: 20px;
	grid-template-areas:
		'tezzomboiz'
		'title'
		'description';

	@include media('>=tablet') {
		grid-template-columns: 1fr 1fr;
		grid-template-areas:
			'tezzomboiz title'
			'description description';
	}
	@include media('>=desktop') {
		grid-template-columns: 1fr 1fr;
		grid-template-areas:
			'tezzomboiz title'
			'tezzomboiz description';
	}
}
</style>
