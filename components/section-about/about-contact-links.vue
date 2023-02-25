<template>
	<div>
		<a
			target="_blank"
			href="https://www.linkedin.com/in/richayotte/"
		>
			<nuxt-img
				alt="LinkedIn logo"
				id="header-twitter-img"
				src="/linkedin.svg"
			/>
		</a>
		<a
			target="_blank"
			href="https://twitter.com/RichAyotte"
		>
			<nuxt-img
				alt="Twitter logo"
				id="header-twitter-img"
				src="/twitter-brands.svg"
			/>
		</a>
		<a
			target="_blank"
			href="https://github.com/RichAyotte"
		>
			<nuxt-img
				alt="GitHub logo"
				id="header-twitter-img"
				src="/github.svg"
			/>
		</a>
		<a
			target="_blank"
			href="https://ayottesoftware.com"
		>
			<nuxt-img
				alt="icon for home"
				id="header-twitter-img"
				src="/house-solid.svg"
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
