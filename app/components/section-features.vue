<template>
	<section class="section-features">
		<div id="feature-boxes">
			<feature-box
				v-for="(feature, index) in features"
				:key="index"
				class="feature-box"
				:title="feature.title"
				:description="feature.description"
				:aspect-ratio="feature.aspectRatio"
				:icon-url="feature.iconUrl"
			/>
		</div>
		<div id="feature-boxes-carousel">
			<feature-box
				v-for="(feature, index) in features"
				:key="index"
				class="feature-box"
				:title="feature.title"
				:description="feature.description"
				:icon-url="feature.iconUrl"
				:aspect-ratio="feature.aspectRatio"
			/>
		</div>
	</section>
</template>

<script setup lang="ts">
import bellConciergeSolid from '~/assets/images/bell-concierge-solid.svg'
import buildingColumns from '~/assets/images/building-columns-solid.svg'
import cashCoinsImg from '~/assets/images/cash-coins.svg'
import envelopeSolid from '~/assets/images/envelope-solid.svg'
import moneyBillImg from '~/assets/images/money-bill-1-wave-solid.svg'
import peopleGroupSolid from '~/assets/images/people-group-solid.svg'

const features = [
	{
		title: 'Customer Support',
		description:
			'Customer support through <a target="_blank" href="https://twitter.com/realbaktz">Twitter</a> and <a target="_blank" href="mailto:support@baktz.com">email</a>',
		iconUrl: bellConciergeSolid,
		aspectRatio: '1/1',
	},
	{
		title: 'Low Fee',
		description:
			'A low commission fee of 10% is automatically deducted at each cycle',
		iconUrl: moneyBillImg,
		aspectRatio: '9/8',
	},
	{
		title: 'Automated Payouts',
		description: 'Payouts to delegates are automated at the end of each cycle',
		iconUrl: envelopeSolid,
		aspectRatio: '1/1',
	},
	{
		title: '10 XTZ Minimum',
		description: 'Delegators must delegate at least 10 XTZ to receive a payout',
		iconUrl: cashCoinsImg,
		aspectRatio: '79/50',
	},
	{
		title: 'Active Voter',
		description:
			'We actively seek community feedback and vote on all phases of the voting process',
		iconUrl: buildingColumns,
		aspectRatio: '1/1',
	},
	{
		title: 'Community Engaged',
		description: 'Active Tezonian since 2017 focused on driving Tezos forward',
		iconUrl: peopleGroupSolid,
		aspectRatio: '5/4',
	},
]
</script>

<style scoped>
@media (width < 600px) {
	#feature-boxes {
		display: none;
	}

	#feature-boxes-carousel {
		display: flex;
		overflow-x: auto;
		scroll-snap-type: x mandatory;
		-webkit-overflow-scrolling: touch;
		gap: 0;
	}

	.feature-box {
		scroll-snap-align: center;
		flex: 0 0 100%;
		width: 100%;
	}
}

@media (width >= 600px) {
	#feature-boxes {
		margin: 4%;
		display: flex;
		flex-wrap: wrap;
		column-gap: calc(4% + 30px);
		row-gap: 50px;

		& > * {
			flex: 1 1 21%;
		}
	}

	#feature-boxes-carousel {
		display: none;
	}
}

.section-features {
	margin-top: 50px;
	background-image: url('~/assets/images/wave-line.svg');
	background-position: center;
	background-repeat: no-repeat;
	background-size: cover;
}

.feature-box {
	background-color: var(--color-bg);
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
	padding: 2rem;
	height: 100%;
}
</style>
