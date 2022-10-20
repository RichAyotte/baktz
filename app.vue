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

main {
	& > * {
		padding: 30px;
	}
}
img {
	height: 25px;
	margin: 15px;
}

#header-baktz-img {
	@include media('>desktop', 'landscape') {
		width: 150px;
		margin: 20px 0 0 20px;
	}
}

#header-twitter-img {
	float: right;
}
</style>
