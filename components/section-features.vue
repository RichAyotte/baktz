<template>
	<section class="section-features">
		<h2>Features</h2>
		<div id="feature-boxes-container">
			<!-- 			<feature-box
				v-for="(feature, index) in features"
				:key="index"
				class="feature-box"
				:title="feature.title"
				:description="feature.description"
				:icon-url="feature.iconUrl"
			/>
 -->
			<carousel
				class=""
				:items-to-show="1"
			>
				<slide
					v-for="(feature, index) in features"
					:key="index"
					><feature-box
						class="feature-box"
						:title="feature.title"
						:description="feature.description"
						:icon-url="feature.iconUrl"
					/>
				</slide>
				<template #addons>
					<navigation />
					<pagination />
				</template>
			</carousel>
		</div>
	</section>
</template>

<script setup lang="ts">
import 'vue3-carousel/dist/carousel.css'
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'

import bellConciergeSolid from '~/assets/images/bell-concierge-solid.svg'
import buildingColumns from '~/assets/images/building-columns-solid.svg'
import cashCoinsImg from '~/assets/images/cash-coins.svg'
import envelopeSolid from '~/assets/images/envelope-solid.svg'
import moneyBillImg from '~/assets/images/money-bill-1-wave-solid.svg'
import peopleGroupSolid from '~/assets/images/people-group-solid.svg'

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
	{
		title: `10 XTZ Minimum`,
		description: `Delegators must delegate at least 10 XTZ to receive a payout`,
		iconUrl: cashCoinsImg,
	},
	{
		title: `Active Voter`,
		description: `We actively seek community feedback and vote on all phases of the voting process`,
		iconUrl: buildingColumns,
	},
	{
		title: `Community Engaged`,
		description: `Active Tezonian since 2017 focused on driving Tezos forward`,
		iconUrl: peopleGroupSolid,
	},
]
</script>

<style lang="scss">
@import 'include-media';
.carousel__slide {
	box-sizing: border-box;
	padding: 0 20px;
}

.carousel__pagination-button {
	padding: 10px;
}
.carousel__next,
.carousel__prev {
	top: 40%;
	opacity: 0.5;
}
.carousel__next {
	right: -15px;
}
.carousel__prev {
	left: -15px;
	opacity: 0.5;
}


@include media('>tablet') {
	.carousel__next,
	.carousel__prev,
	.carousel__pagination {
		display: none;
	}

	.carousel__track {
		display: flex;
		flex-wrap: wrap;
		gap: 20px;
	}
	.carousel__slide {
		flex: 1 1 20vw;
		min-width: 30%;
	}
}

</style>

<style lang="scss" scoped>
@import 'assets/styles/variables';
@import 'include-media';

// #feature-boxes-container {
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

#feature-boxes-container {
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
	padding: 2rem;
	height: 100%;
}
</style>
