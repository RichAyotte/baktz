<template>
	<section class="section-earnings">
		<h2>Earnings</h2>
		<div class="gradient-box-border">
			<form>
				<label for="delegated-xtz-amount">Enter your ꜩ Amount</label>
				<input
					type="text"
					name="delegated-xtz-amount"
				/>
			</form>
			<table class="expected-earnings">
				<thead />
				<tfoot />
				<tbody>
					<tr>
						<th>Per Cycle</th>
						<td>
							<strong>{{ cycleEarning }}</strong> ꜩ
						</td>
					</tr>
					<tr>
						<th>Per Week</th>
						<td>
							<strong>{{ weeklyEarning }}</strong> ꜩ
						</td>
					</tr>
					<tr>
						<th>Per Month</th>
						<td>
							<strong>{{ monthlyEarning }}</strong> ꜩ
						</td>
					</tr>
					<tr>
						<th>Per Year</th>
						<td>
							<strong>{{ yearlyEarning }}</strong> ꜩ
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	</section>
</template>

<script setup lang="ts">
const cycleEarning = 100
const weeklyEarning = 100
const monthlyEarning = 100
const yearlyEarning = 100
</script>

<style scoped>
.section-earnings {
	display: flex;
	flex-direction: column;
	align-items: center;
	
	.gradient-box-border {
		width: 100%;
		max-width: 600px;
		padding: 40px;
		display: flex;
		flex-direction: column;
		gap: 30px;
	}
}

form {
	display: flex;
	flex-direction: column;
	gap: 12px;
	
	label {
		color: var(--color-text-muted);
		font-size: 1.1rem;
		font-weight: 600;
	}
	
	input {
		font-size: 1.2rem;
		font-family: 'JetBrains Mono', monospace;
	}
}

.expected-earnings {
	width: 100%;
	border-collapse: collapse;

	tr {
		text-align: left;
		border-bottom: 1px solid var(--color-table-border);
		
		&:last-child {
			border-bottom: none;
		}
	}
	
	th, td {
		padding: 16px 0;
	}

	th {
		color: var(--color-text-muted);
		font-weight: 600;
	}

	td {
		text-align: right;
		font-family: 'JetBrains Mono', monospace;
		font-size: 1.1rem;
		
		strong {
			color: var(--color-secondary);
			font-size: 1.2rem;
		}
	}
}
</style>
