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
		<carousel
			id="feature-boxes-carousel"
			:items-to-show="1"
		>
			<slide
				v-for="(feature, index) in features"
				:key="index"
			>
				<feature-box
					class="feature-box"
					:title="feature.title"
					:description="feature.description"
					:icon-url="feature.iconUrl"
					:aspect-ratio="feature.aspectRatio"
				/>
			</slide>
			<template #addons>
				<navigation />
				<pagination />
			</template>
		</carousel>
	</section>
</template>

<script setup lang="ts">
import 'vue3-carousel/dist/carousel.css'
import {
	Carousel,
	Slide,
	Pagination,
	Navigation,
} from 'vue3-carousel/dist/carousel.es.js'

import bellConciergeSolid from '~/assets/images/bell-concierge-solid.svg'
import buildingColumns from '~/assets/images/building-columns-solid.svg'
import cashCoinsImg from '~/assets/images/cash-coins.svg'
import envelopeSolid from '~/assets/images/envelope-solid.svg'
import moneyBillImg from '~/assets/images/money-bill-1-wave-solid.svg'
import peopleGroupSolid from '~/assets/images/people-group-solid.svg'

const features = [
	{
		title: `Customer Support`,
		description: `Customer support through <a target="_blank" href="https://twitter.com/realbaktz">Twitter</a> and <a target="_blank" href="mailto:support@baktz.com">email</a>`,
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
		title: `Automated Payouts`,
		description: `Payouts to delegates are automated at the end of each cycle`,
		iconUrl: envelopeSolid,
		aspectRatio: '1/1',
	},
	{
		title: `10 XTZ Minimum`,
		description: `Delegators must delegate at least 10 XTZ to receive a payout`,
		iconUrl: cashCoinsImg,
		aspectRatio: '79/50',
	},
	{
		title: `Active Voter`,
		description: `We actively seek community feedback and vote on all phases of the voting process`,
		iconUrl: buildingColumns,
		aspectRatio: '1/1',
	},
	{
		title: `Community Engaged`,
		description: `Active Tezonian since 2017 focused on driving Tezos forward`,
		iconUrl: peopleGroupSolid,
		aspectRatio: '5/4',
	},
]
</script>

<style lang="scss">
@import '~/assets/styles/variables';
@import 'include-media';
.carousel__slide {
	box-sizing: border-box;
	padding: 0 20px;
}

.carousel__pagination-button {
	&:hover,
	&:active {
		box-shadow: none;
		color: var(--vc-nav-color);
	}
	&::after {
		background-color: $primary-accent-color;
		border-radius: 3px;
		margin: 0 10px 0 10px;
		opacity: 0.5;
		padding: 5px;
	}
}

.carousel__pagination-button:hover::after,
.carousel__pagination-button--active::after {
	background-color: $primary-accent-color;
	opacity: 1;
}

.carousel__next,
.carousel__prev {
	background-color: $primary-accent-color;
	border-radius: 3px;
	top: 40%;
	&:hover,
	&:active {
		box-shadow: none;
		color: var(--vc-nav-color);
	}
}

.carousel__next {
	right: -30px;
}

.carousel__prev {
	left: -30px;
}

.carousel__pagination {
	padding: 0;
}
</style>

<style lang="scss" scoped>
@import 'assets/styles/variables';
@import 'include-media';

@include media('<600px') {
	#feature-boxes {
		display: none;
	}
	#feature-boxes-carousel {
		display: block;
	}
	.feature-box {
		width: 100%;
	}
}

@include media('>=600px') {
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
