<template>
	<section class="section-fees">
		<table id="baking-rules">
			<caption>
				<h2>Fees and capacity</h2>
			</caption>
			<tr>
				<th>Fee</th>
				<td>10%</td>
			</tr>
			<tr>
				<th>Minimum</th>
				<td>10 XTZ</td>
			</tr>
			<tr>
				<th>Capacity</th>
				<td>2,500,000 ꜩ</td>
			</tr>
			<tr>
				<th>Free Space</th>
				<td>2,233,321 ꜩ</td>
			</tr>
		</table>
	</section>
</template>

<style lang="scss" scoped>
@use 'sass:color';
@import '~/assets/styles/variables';
@import 'include-media';

.section-fees {
	// background-color: color.adjust($background-color, $lightness: 10%);
}

#baking-rules {
	background-color: color.adjust(
		$background-color,
		$lightness: 5%,
		$alpha: -0.5
	);
	border-collapse: collapse;
	margin: 0px auto;
	td,
	th {
		padding: 10px 25px;
		border: 1px solid color.adjust($background-color, $lightness: 25%);
		box-shadow: #000;
	}
	th {
		text-align: left;
	}
	td {
		color: white;
		font-style: italic;
		text-align: right;
	}
}
</style>
