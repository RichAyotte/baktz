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
	background: color-mix(in srgb, var(--color-bg-surface) 50%, transparent);
	backdrop-filter: blur(10px);
	border: 1px solid var(--color-table-border);
	border-radius: 12px;
	border-collapse: separate;
	border-spacing: 0;
	margin: 0px auto;
	width: 100%;
	max-width: 600px;
	overflow: hidden;

	td,
	th {
		padding: 20px 30px;
		border-bottom: 1px solid var(--color-table-border);
	}
	
	tr:last-child td,
	tr:last-child th {
		border-bottom: none;
	}

	th {
		text-align: left;
		font-weight: 600;
		color: var(--color-text-muted);
	}

	td {
		color: var(--color-text);
		font-family: 'JetBrains Mono', monospace;
		text-align: right;
		font-size: 1.1rem;
	}
}
</style>
