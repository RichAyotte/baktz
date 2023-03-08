<template>
	<section class="section-earnings">
		<h2>Earnings</h2>
		<div class="gradient-box-border">
			<form>
				<label for="delegated-xtz-amount">Enter your XTZ Amount</label>
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
							<strong>{{ cycleEarning }}</strong> XTZ
						</td>
					</tr>
					<tr>
						<th>Per Week</th>
						<td>
							<strong>{{ weeklyEarning }}</strong> XTZ
						</td>
					</tr>
					<tr>
						<th>Per Month</th>
						<td>
							<strong>{{ monthlyEarning }}</strong> XTZ
						</td>
					</tr>
					<tr>
						<th>Per Year</th>
						<td>
							<strong>{{ yearlyEarning }}</strong> XTZ
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

<style lang="scss" scoped>
@import 'assets/styles/variables';
@import 'assets/styles/global';
.section-earnings {
	& > * {
		flex: 1 1 20vw;
		padding: 2rem;
	}
}

.expected-earnings {
	width: 100%;
	tr {
		text-align: left;
	}
	td {
		strong {
			color: $secondary-accent-color;
		}
	}
}
</style>
