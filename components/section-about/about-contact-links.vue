<template>
	<div>
		<a
			target="_blank"
			href="https://www.linkedin.com/in/richayotte/"
		>
			<img
				alt="LinkedIn logo"
				id="header-twitter-img"
				src="~/assets/images/linkedin.svg"
			/>
		</a>
		<a
			target="_blank"
			href="https://twitter.com/RichAyotte"
		>
			<img
				alt="Twitter logo"
				id="header-twitter-img"
				src="~/assets/images/twitter-brands.svg"
			/>
		</a>
		<a
			target="_blank"
			href="https://github.com/RichAyotte"
		>
			<img
				alt="GitHub logo"
				id="header-twitter-img"
				src="~/assets/images/github.svg"
			/>
		</a>
		<a
			target="_blank"
			href="https://ayottesoftware.com"
		>
			<img
				alt="icon for home"
				id="header-twitter-img"
				src="~/assets/images/house-solid.svg"
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
