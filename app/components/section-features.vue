<template>
	<section class="section-features">
		<div id="feature-boxes">
			<feature-box
				v-for="(feature, index) in features"
				:key="index"
				class="feature-box gradient-box-border"
				:title="feature.title"
				:description="feature.description"
				:aspect-ratio="feature.aspectRatio"
				:icon-url="feature.iconUrl"
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
			'Reach us anytime on <a target="_blank" href="https://x.com/realbaktz">X</a> or by <a target="_blank" href="mailto:support@baktz.com">email</a> — we\'re here to help',
		iconUrl: bellConciergeSolid,
		aspectRatio: '1/1',
	},
	{
		title: 'Low Fees',
		description: 'Just 5% for stakers and 10% for delegators',
		iconUrl: moneyBillImg,
		aspectRatio: '9/8',
	},
	{
		title: 'Automated Payouts',
		description:
			'Staking rewards are built into the protocol. Delegation payouts are sent automatically each cycle',
		iconUrl: envelopeSolid,
		aspectRatio: '1/1',
	},
	{
		title: 'No Minimum to Stake',
		description:
			'Stake any amount with no minimum. Delegators need just 10 ꜩ to get started',
		iconUrl: cashCoinsImg,
		aspectRatio: '79/50',
	},
	{
		title: 'Active Voter',
		description:
			"Voted on every protocol upgrade since Tezos' first proposal — your voice matters to us",
		iconUrl: buildingColumns,
		aspectRatio: '1/1',
	},
	{
		title: 'Community Engaged',
		description:
			'Part of the Tezos community since 2017, committed to its long-term success',
		iconUrl: peopleGroupSolid,
		aspectRatio: '5/4',
	},
]
</script>

<style scoped>
.section-features {
	position: relative;
	width: 100%;
}

#feature-boxes {
	/* Mobile Carousel Layout */
	display: flex;
	overflow-x: auto;
	scroll-snap-type: x mandatory;
	-webkit-overflow-scrolling: touch;
	gap: 20px;
	
	/* Full bleed scrolling on mobile */
	margin: 0 -20px;
	padding: 0 20px 20px 20px;
	width: calc(100% + 40px);
	
	/* Hide scrollbar for cleaner look on mobile, but keep functionality */
	scrollbar-width: none; /* Firefox */
	&::-webkit-scrollbar {
		display: none; /* Chrome/Safari */
	}

	/* Desktop Grid Layout */
	@media (width >= 768px) {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
		gap: 40px;
		margin: 0 auto;
		padding: 0;
		width: 100%;
		overflow-x: visible;
	}
}

.feature-box {
	padding: 2.5rem 2rem;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: center;
	transition: transform 0.3s ease, box-shadow 0.3s ease;
	height: auto;
	
	/* Mobile Carousel Item Sizing */
	scroll-snap-align: center;
	flex: 0 0 85%;
	max-width: 85%;
	
	/* Reset sizing for desktop grid */
	@media (width >= 768px) {
		flex: none;
		max-width: none;
	}
}

.feature-box:hover {
	transform: translateY(-5px);
	box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}
</style>
