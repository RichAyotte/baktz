<template>
	<figure id="home-tezzomboiz">
		<nuxt-img
			alt="Baked Tezzomboi smoking weed"
			id="baktz-tezzomboi"
			sizes="xs:100vw sm:100vw md:100vw lg:50vw xl:50vw xxl:50vw"
			src="batkz-tezzomboiz-transparent.webp"
			style="width: 100%; aspect-ratio: 1/1"
		/>
		<figcaption>
			<a
				target="_blank"
				href="https://objkt.com/asset/hicetnunc/468242"
				>Tezzomboiz Series 1: 076</a
			>
			by
			<a
				target="_blank"
				href="https://mattbag3d.artstation.com/resume"
				>mattbag3d</a
			>
		</figcaption>
	</figure>
</template>

<style lang="scss" scoped>
@import 'assets/styles/variables';
@import 'include-media';

#home-tezzomboiz {
	margin: 0;
	text-align: center;
	&::before {
		content: '';
		background: radial-gradient(70vw at 45%, rgba(104, 110, 12, 1), transparent)
			no-repeat;
		height: 200vw;
		left: 0;
		position: absolute;
		top: -35vw;
		width: 100vw;
		z-index: -1;

		@include media('>=tablet') {
			background: radial-gradient(40vw at 60%, rgba(104, 110, 12, 1), transparent)
				no-repeat;
			height: 200vw;
			left: -100vw;
			top: -65vw;
			width: 200%;
		}

		@include media('>1600px') {
			background: radial-gradient(
					600px at 1200px,
					rgba(104, 110, 12, 1),
					transparent
				)
				no-repeat;
			height: 3200px;
			left: calc(-1600px + 50%);
			top: -1040px;
			width: 100%;
		}
	}
}
</style>

