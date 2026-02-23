<template>
	<client-only>
		<AppToast />
	</client-only>
	<header>
		<nuxt-img
			alt="Baktz logo"
			id="header-baktz-img"
			src="baktz-logo.svg"
			style="aspect-ratio: 361/127"
		/>
		<a href="https://twitter.com/realbaktz">
			<nuxt-img
				alt="Twitter logo"
				id="header-twitter-img"
				src="twitter-brands.svg"
				style="aspect-ratio: 16/13"
			/>
		</a>
	</header>
	<main>
		<section-home />
		<section-features />
		<section-fees />
		<section-earnings />
		<section-about />
	</main>
</template>

<style scoped>
header {
	max-width: var(--max-content-width);
	margin: 0 auto;
}

main {
	max-width: var(--max-content-width);
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

	@media (width >= 768px) {
		height: clamp(30px, 5vw, 100px);
	}
}

#header-twitter-img {
	height: 30px;
	float: right;
}
</style>
