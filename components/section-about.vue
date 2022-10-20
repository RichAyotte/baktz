<template>
	<section class="section-about">
		<h2>About</h2>
		<img
			id="headshot"
			src="~/assets/images/headshot.jpg"
			alt="Photo of Richard Ayotte"
		/>
		<p>
			<img
				class="text-logo"
				src="~/assets/images/baktz-logo.svg"
			/>
			is a <em><strong>Tezos only</strong></em> delegation service started by Rich
			Ayotte. Rich has been baking since July of 2018 and opened his bakery to the
			public during the fall of 2022.
		</p>
		<ul id="personal-links">
			<li><a href="https://www.linkedin.com/in/richayotte/">LinkedIn</a></li>
			<li><a href="https://twitter.com/RichAyotte">Twitter</a></li>
			<li><a href="https://github.com/RichAyotte">GitHub</a></li>
			<li><a href="https://ayottesoftware.com">Homepage</a></li>
		</ul>
	</section>
</template>

<style lang="scss" scoped>
.text-logo {
	display: inline-block;
	height: 21px;
	vertical-align: text-bottom;
}

#headshot {
	border-radius: 5px;
	box-shadow: 10px 10px 5px 0px rgba(0, 0, 0, 0.2);
	display: block;
	float: right;
	margin: 10px 0 10px 10px;
	max-width: 300px;
	transform: rotate(-8deg);
	width: 40%;
}

#personal-links {
	align-items: center;
	clear: both;
	display: flex;
	flex-wrap: wrap;
	gap: 10px;
	list-style-type: none;
	padding: 30px 0 0;
	li {
		flex: 1 1;
		text-align: center;
	}
}
</style>
