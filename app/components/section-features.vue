<template>
	<section class="section-features">
		<h2 class="section-heading">Why <BaktzLogo size="clamp(1.4rem, 3vw, 2rem)" />?</h2>
		<div class="carousel-wrapper">
			<div id="feature-boxes" ref="scrollContainer">
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
			<div class="fade-left" :class="{ visible: showLeftFade }" />
			<div class="fade-right" :class="{ visible: showRightFade }" />
		</div>
		<div class="pagination-dots">
			<button
				v-for="(feature, i) in features"
				:key="i"
				:class="{ active: activeIndex === i }"
				:aria-label="`Go to ${feature.title}`"
				@click="scrollToCard(i)"
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

const scrollContainer = ref<HTMLElement | null>(null)
const activeIndex = ref(0)
const showLeftFade = ref(false)
const showRightFade = ref(true)

function onScroll() {
	const el = scrollContainer.value
	if (!el) return

	const { scrollLeft, scrollWidth, clientWidth } = el
	const viewportCenter = scrollLeft + clientWidth / 2

	let closestIndex = 0
	let closestDistance = Infinity
	for (let i = 0; i < el.children.length; i++) {
		const child = el.children[i] as HTMLElement
		const cardCenter = child.offsetLeft + child.offsetWidth / 2
		const distance = Math.abs(cardCenter - viewportCenter)
		if (distance < closestDistance) {
			closestDistance = distance
			closestIndex = i
		}
	}
	activeIndex.value = closestIndex

	showLeftFade.value = scrollLeft > 5
	showRightFade.value = scrollLeft + clientWidth < scrollWidth - 5
}

function scrollToCard(index: number) {
	const el = scrollContainer.value
	if (!el) return

	const card = el.children[index] as HTMLElement
	if (!card) return

	const left = card.offsetLeft - (el.clientWidth - card.offsetWidth) / 2
	el.scrollTo({ left, behavior: 'smooth' })
}

onMounted(() => {
	scrollContainer.value?.addEventListener('scroll', onScroll, { passive: true })
	onScroll()
})

onUnmounted(() => {
	scrollContainer.value?.removeEventListener('scroll', onScroll)
})

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

.section-heading {
	text-align: center;
	font-size: clamp(1.4rem, 3vw, 2rem);
	font-weight: 700;
	color: var(--color-text);
	letter-spacing: 0.02em;
	margin: 0 0 2.5rem;
}

#feature-boxes {
	/* Mobile Carousel Layout */
	display: flex;
	overflow-x: auto;
	scroll-snap-type: x mandatory;
	gap: 20px;
	
	/* Padding for first/last card spacing */
	padding: 0 20px 20px 20px;
	
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
	scroll-snap-stop: always;
	flex: 0 0 85%;
	max-width: 85%;
	
	/* Reset sizing for desktop grid */
	@media (width >= 768px) {
		flex: none;
		max-width: none;
	}
}

@media (width >= 768px) {
	.feature-box:hover {
		transform: translateY(-5px);
		box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
	}
}

.carousel-wrapper {
	position: relative;
	margin: 0 -20px;
	width: calc(100% + 40px);

	@media (width >= 768px) {
		display: contents;
	}
}

.fade-left,
.fade-right {
	position: absolute;
	top: 0;
	bottom: 20px;
	width: 40px;
	z-index: 2;
	pointer-events: none;
	opacity: 0;
	transition: opacity 0.3s ease;

	@media (width >= 768px) {
		display: none;
	}
}

.fade-left {
	left: 0;
	background: linear-gradient(to right, var(--color-bg), transparent);
}

.fade-right {
	right: 0;
	background: linear-gradient(to left, var(--color-bg), transparent);
}

.fade-left.visible,
.fade-right.visible {
	opacity: 1;
}

.pagination-dots {
	display: flex;
	justify-content: center;
	gap: 10px;
	padding-top: 12px;

	@media (width >= 768px) {
		display: none;
	}
}

.pagination-dots button {
	width: 10px;
	height: 10px;
	border-radius: 50%;
	background: color-mix(in srgb, var(--color-text-muted) 30%, transparent);
	border: none;
	padding: 0;
	cursor: pointer;
	transition: background 0.3s ease, transform 0.3s ease;
}

.pagination-dots button.active {
	background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
	transform: scale(1.3);
}
</style>
