<template>
	<section class="section-features">
		<h2>Features</h2>
		<feature-box
			class="feature-box"
			v-for="(feature, index) in features"
			:key="index"
			:title="feature.title"
			:description="feature.description"
			:icon-url="feature.iconUrl"
		/>
	</section>
</template>

<script setup lang="ts">
import bellConciergeSolid from '~/assets/images/bell-concierge-solid.svg'
// import buildingColumns from '~/assets/images/building-columns-solid.svg'
// import cashCoinsImg from '~/assets/images/cash-coins.svg'
import envelopeSolid from '~/assets/images/envelope-solid.svg'
import moneyBillImg from '~/assets/images/money-bill-1-wave-solid.svg'
// import peopleGroupSolid from '~/assets/images/people-group-solid.svg'

const features = [
	{
		title: `Customer Support`,
		description: `24/7 customer support through Twitter and email`,
		iconUrl: bellConciergeSolid,
	},
	{
		title: 'Low Fee',
		description:
			'A low commission fee of 10% is automatically deducted at each cycle',
		iconUrl: moneyBillImg,
	},
	{
		title: `Automated Payouts`,
		description: `Payouts to delegates are automated at the end of each cycle`,
		iconUrl: envelopeSolid,
	},
	// {
	// 	title: `10 XTZ Minimum`,
	// 	description: `Delegators must delegate at least 10 XTZ to receive a payout`,
	// 	iconUrl: cashCoinsImg,
	// },
	// {
	// 	title: `Active Voter`,
	// 	description: `We actively seek community feedback and vote on all phases of the voting process`,
	// 	iconUrl: buildingColumns,
	// },
	// {
	// 	title: `Community Engaged`,
	// 	description: `Active Tezonian since 2017 focused on driving Tezos forward`,
	// 	iconUrl: peopleGroupSolid,
	// },
]
</script>

<style lang="scss" scoped>
@import 'assets/styles/variables';

// .section-features {
// 	background-image: url(/assets/images/wave-line.svg);
// 	background-position: center;
// 	background-repeat: no-repeat;
// 	background-size: cover;
// 	box-sizing: border-box;
// 	display: flex;
// 	flex-wrap: wrap;
// 	gap: 2rem;
// 	padding: 2rem;
// 	width: 100%;
// 	& > * {
// 		background-color: $background-color;
// 		border-image: linear-gradient(
// 				to bottom,
// 				#665c82 10.41669%,
// 				#867379 21.875%,
// 				#755d4b 30.7292%,
// 				#7d553f 41.6667%,
// 				#707a56 53.6458%,
// 				#729270 63.5417%,
// 				#89b6a4 72.3958%,
// 				#9ca3ac 84.375%,
// 				rgba(189, 164, 174, 0.25) 92.7083%,
// 				rgba(221, 182, 183, 0) 100%
// 			)
// 			1 1;
// 		border-color: #665c82;
// 		border-style: solid;
// 		border-width: 1px;
// 		flex: 1 1 20vw;
// 		padding: 2rem;
// 	}
// }

.section-features {
	background-image: url(/assets/images/wave-line.svg);
	background-position: center;
	background-repeat: no-repeat;
	background-size: cover;
}
.feature-box {
	background-color: $background-color;
	border-image: linear-gradient(
			to bottom,
			#665c82 10.41669%,
			#867379 21.875%,
			#755d4b 30.7292%,
			#7d553f 41.6667%,
			#707a56 53.6458%,
			#729270 63.5417%,
			#89b6a4 72.3958%,
			#9ca3ac 84.375%,
			rgba(189, 164, 174, 0.25) 92.7083%,
			rgba(221, 182, 183, 0) 100%
		)
		1 1;
	border-color: #665c82;
	border-style: solid;
	border-width: 1px;
	flex: 1 1 20vw;
	padding: 2rem;
	// min-width: 70%;
}
</style>
