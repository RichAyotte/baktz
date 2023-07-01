<template>
	<div>
		<a
			target="_blank"
			href="https://www.linkedin.com/in/richayotte/"
		>
			<nuxt-img
				alt="LinkedIn logo"
				loading="lazy"
				src="linkedin.svg"
				style="aspect-ratio: 7/8"
			/>
		</a>
		<a
			target="_blank"
			href="https://twitter.com/RichAyotte"
		>
			<nuxt-img
				alt="Twitter logo"
				loading="lazy"
				src="twitter-brands.svg"
				style="aspect-ratio: 16/13"
			/>
		</a>
		<a
			target="_blank"
			href="https://github.com/RichAyotte"
		>
			<nuxt-img
				alt="GitHub logo"
				loading="lazy"
				src="github.svg"
				style="aspect-ratio: 31/32"
			/>
		</a>
		<a
			target="_blank"
			href="https://ayottesoftware.com"
		>
			<nuxt-img
				alt="icon for home"
				loading="lazy"
				src="house-solid.svg"
				style="aspect-ratio: 9/8"
			/>
		</a>
	</div>
</template>

<style lang="scss" scoped>
@import 'assets/styles/variables';
@import 'include-media';

div {
	align-self: start;
	justify-self: center;
	@include media('>=500px') {
		justify-self: left;
	}
}
a {
	border-bottom: 3px solid transparent;
	display: inline-block;
	margin: 0 20px 0 0;
	text-decoration: none;
	&:hover {
		border-color: $primary-accent-color;
	}
}
img {
	height: 20px;
}
</style>
