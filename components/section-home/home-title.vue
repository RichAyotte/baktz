<template>
	<div id="home-title">
		<h1>
			Reliable
			<nuxt-img src="tezos-logo-horizontal-white.svg" />
			Delegation Service
		</h1>
	</div>
</template>
<style lang="scss" scoped>
#home-title {
	align-self: end;
	h1 {
		color: white;
		font-size: clamp(2rem, 10vw, 4rem);
		img {
			display: inline-block;
			vertical-align: text-bottom;
			height: clamp(3rem, 15vw, 5rem);
			vertical-align: middle;
		}
	}
}
</style>
