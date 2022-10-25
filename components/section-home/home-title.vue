<template>
	<div id="home-title">
		<h1>
			Reliable
			<img src="~/assets/images/tezos-logo-horizontal-white.svg" />
			Delegation Service
		</h1>
	</div>
</template>
<style lang="scss" scoped>
#home-title {
	// align-items: center;
	// display: flex;
	// flex-wrap: wrap;
	// justify-content: center;
	// margin: 60px 15px;
	h1 {
		font-size: clamp(2rem, 10vw, 4rem);
		img {
			display: inline-block;
			vertical-align: text-bottom;
			height: clamp(3rem, 15vw, 5rem);
			vertical-align: middle;
		}
	}
	& > * {
		// flex: 1 1 30vw;
	}
}

h1 {
	color: white;
	font-size: 20pt;
	font-weight: lighter;
}
</style>
