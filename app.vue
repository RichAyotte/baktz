<template>
	<notifications
		position="top center"
		:ignore-duplicates="true"
		:pause-on-hover="true"
	/>
	<header>
		<img
			id="header-baktz-img"
			src="~/assets/images/baktz-logo.svg"
		/>
		<a href="https://twitter.com/realbaktz">
			<img
				id="header-twitter-img"
				src="~/assets/images/twitter-brands.svg"
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
	height: 30px;
	margin: clamp(15px, 2vw, 200px);
}

#header-baktz-img {
	@include media('>=tablet') {
		height: clamp(15px, 5vw, 100px);
	}
}

#header-twitter-img {
	float: right;
}
</style>
