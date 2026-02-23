<template>
	<section class="section-home">
		<home-tezzomboiz style="grid-area: tezzomboiz" />
		<home-title style="grid-area: title" />
		<home-description style="grid-area: description" />
	</section>
</template>

<script setup lang="ts">
import HomeDescription from './home-description.vue'
import HomeTezzomboiz from './home-tezzomboiz.vue'
import HomeTitle from './home-title.vue'
</script>

<style scoped>
.section-home {
	align-items: center;
	display: grid;
	gap: 50px 10px;
	grid-template-areas:
		'tezzomboiz'
		'title'
		'description';
	grid-template-columns: minmax(0, auto);

	@media (width >= 768px) {
		grid-template-areas:
			'tezzomboiz title'
			'description description';
		grid-template-columns: 1fr 1fr;
	}

	@media (width >= 1024px) {
		grid-template-areas:
			'tezzomboiz title'
			'tezzomboiz description';
		grid-template-columns: 1fr 1fr;
	}
}
</style>
