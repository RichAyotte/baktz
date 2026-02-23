<template>
	<section class="section-fees">
		<table id="baking-rules">
			<caption>
				<h2>Fees and capacity</h2>
			</caption>
			<tbody>
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
			</tbody>
		</table>
	</section>
</template>

<style scoped>
#baking-rules {
	background-color: var(--color-table-bg);
	border-collapse: collapse;
	margin: 0px auto;

	td,
	th {
		padding: 10px 25px;
		border: 1px solid var(--color-table-border);
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
