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
			'Customer support through <a target="_blank" href="https://x.com/realbaktz">X</a> and <a target="_blank" href="mailto:support@baktz.com">email</a>',
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
		description:
			'Payouts to stakers are automated at the end of each cycle',
		iconUrl: envelopeSolid,
		aspectRatio: '1/1',
	},
	{
		title: '10 XTZ Minimum',
		description: 'Stakers must stake at least 10 XTZ to receive a payout',
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
		description:
			'Active Tezonian since 2017 focused on driving Tezos forward',
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
