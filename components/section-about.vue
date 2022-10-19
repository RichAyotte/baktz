<template>
	<section class="section-about">
		<h2>About</h2>
		<img
			class="headshot"
			src="~/assets/images/headshot.jpg"
			alt="Photo of Richard Ayotte"
		/>
		<p>
			<img
				class="text-logo"
				src="~/assets/images/baktz-logo.svg"
			/>
			is a <em><strong>Tezos only</strong></em> staking service started by Rich
			Ayotte. Rich been baking since July of 2018 and opened up his bakery to the
			public in 2022.
		</p>
		<ul>
			<li>
				<a href="https://stackoverflow.com/users/382228/richard-ayotte"
					>StackOverflow</a
				>
			</li>
			<li><a href="https://twitter.com/RichAyotte">Twitter</a></li>
			<li><a href="https://www.linkedin.com/in/richayotte/">LinkedIn</a></li>
			<li><a href="https://github.com/RichAyotte">GitHub</a></li>
			<li><a href="https://ayottesoftware.com">Homepage</a></li>
		</ul>
	</section>
</template>

<style lang="scss" scoped>
#mugshot {
	float: left;
}
.text-logo {
	display: inline-block;
	height: 21px;
	vertical-align: text-bottom;
}

.headshot {
	border-radius: 5px;
	box-shadow: 10px 10px 5px 0px rgba(0, 0, 0, 0.2);
	display: block;
	margin: 25px auto;
	max-width: 300px;
	transform: rotate(-8deg);
	width: 60%;
}
</style>
