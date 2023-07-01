<template>
	<client-only>
		<notifications
			position="top center"
			:ignore-duplicates="true"
			:pause-on-hover="true"
		/>
	</client-only>
	<header>
		<nuxt-img
			alt="Baktz logo"
			id="header-baktz-img"
			loading="lazy"
			src="baktz-logo.svg"
		/>
		<a href="https://twitter.com/realbaktz">
			<nuxt-img
				alt="Twitter logo"
				id="header-twitter-img"
				loading="lazy"
				src="twitter-brands.svg"
			/>
		</a>
	</header>
	<main>
		<section-home />
		<section-features />
		<section-about />
	</main>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
@import 'assets/styles/variables';
@import 'include-media';

header {
	max-width: $max-content-width;
	margin: 0 auto;
}

main {
	max-width: $max-content-width;
	margin: 0 auto;
	& > * {
		padding: 30px;
	}
}

img {
	margin: clamp(15px, 2vw, 200px);
}

#header-baktz-img {
	height: 35px;
	@include media('>=tablet') {
		height: clamp(30px, 5vw, 100px);
	}
}

#header-twitter-img {
	height: 30px;
	float: right;
}
</style>
