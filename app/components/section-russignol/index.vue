<template>
	<section class="section-russignol">
		<h2 class="section-heading">Powered by Russignol</h2>
		<p class="intro">
			Built by the creator of <BaktzLogo size="1.15rem" />,
			<a href="https://russignol.com" target="_blank" rel="noopener"
				>Russignol</a
			>
			is an open-source hardware signer on a Raspberry Pi Zero 2W with
			e-ink touchscreen — purpose-built for fast BLS signatures and
			reliable baking.
		</p>
		<div class="device-illustration">
			<img
				:src="deviceImg"
				alt="Russignol hardware signer device"
				width="320"
				height="230"
			/>
		</div>
		<div class="carousel-wrapper">
			<div ref="scrollContainer" class="card-grid">
				<feature-box
					class="gradient-box-border"
					title="Speed"
					stat="~6ms"
					stat-label="BLS signatures"
					description="Built in Rust with the audited <a href='https://github.com/supranational/blst' target='_blank' rel='noopener'>blst</a> library and no garbage collector. A 7.4MB system image means fast boot with nothing unnecessary running."
					:icon-url="boltIcon"
				/>
				<feature-box
					class="gradient-box-border"
					title="Security"
					stat="7.4MB"
					stat-label="compressed image"
					description="Keys never leave the device. WiFi, Bluetooth, and SSH are compiled out of the kernel. Hardened Linux with AES-256-GCM PIN protection and high watermark anti-double-baking."
					:icon-url="shieldIcon"
				/>
				<feature-box
					class="gradient-box-border"
					title="Open Source"
					stat="MIT"
					stat-label="licensed"
					description="Fully auditable codebase — inspect every line that touches your keys. Created and battle-tested by an active Tezos baker."
					:icon-url="codeIcon"
				/>
			</div>
			<div class="fade-left" :class="{ visible: showLeftFade }" />
			<div
				class="fade-right"
				:class="{ visible: showRightFade }"
			/>
		</div>
		<div class="pagination-dots">
			<button
				v-for="(card, i) in cards"
				:key="i"
				:class="{ active: activeIndex === i }"
				:aria-label="`Go to ${card.title}`"
				@click="scrollToCard(i)"
			/>
		</div>
		<div class="cta">
			<a
				href="https://russignol.com"
				target="_blank"
				rel="noopener"
				class="cta-button"
			>
				Learn More at Russignol.com
			</a>
		</div>
	</section>
</template>

<script setup lang="ts">
import boltIcon from '~/assets/images/bolt-solid.svg'
import codeIcon from '~/assets/images/code-solid.svg'
import deviceImg from '~/assets/images/russignol-device.webp'
import shieldIcon from '~/assets/images/shield-halved-solid.svg'

const scrollContainer = ref<HTMLElement | null>(null)
const activeIndex = ref(0)
const showLeftFade = ref(false)
const showRightFade = ref(true)

const cards = [
	{ title: 'Speed' },
	{ title: 'Security' },
	{ title: 'Open Source' },
]

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
	scrollContainer.value?.addEventListener('scroll', onScroll, {
		passive: true,
	})
	onScroll()
})

onUnmounted(() => {
	scrollContainer.value?.removeEventListener('scroll', onScroll)
})
</script>

<style scoped>
.section-heading {
	text-align: center;
	font-size: clamp(1.4rem, 3vw, 2rem);
	font-weight: 700;
	color: var(--color-text);
	letter-spacing: 0.02em;
	margin: 0 0 1.5rem;
}

.intro {
	text-align: center;
	max-width: 700px;
	margin: 0 auto 3rem;
	color: var(--color-text-muted);
	font-size: 1.15rem;
	line-height: 1.7;
}

.device-illustration {
	text-align: center;
	margin-bottom: 3rem;
}

.device-illustration img {
	max-width: 320px;
	width: 100%;
	height: auto;
}

.card-grid :deep(.feature-box) {
	padding: 2.5rem 2rem;
}

@media (width >= 768px) {
	.card-grid :deep(.gradient-box-border:hover) {
		transform: translateY(-5px);
		box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
	}
}

.card-grid {
	display: flex;
	overflow-x: auto;
	scroll-snap-type: x mandatory;
	gap: 20px;
	padding: 0 20px 20px 20px;

	scrollbar-width: none;
	&::-webkit-scrollbar {
		display: none;
	}

	@media (width >= 768px) {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 24px;
		padding: 0;
		overflow-x: visible;
	}
}

.card-grid :deep(.gradient-box-border) {
	scroll-snap-align: center;
	scroll-snap-stop: always;
	flex: 0 0 85%;
	max-width: 85%;

	@media (width >= 768px) {
		flex: none;
		max-width: none;
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
	background: color-mix(
		in srgb,
		var(--color-text-muted) 30%,
		transparent
	);
	border: none;
	padding: 0;
	cursor: pointer;
	transition: background 0.3s ease, transform 0.3s ease;
}

.pagination-dots button.active {
	background: linear-gradient(
		135deg,
		var(--color-primary),
		var(--color-secondary)
	);
	transform: scale(1.3);
}

.cta {
	text-align: center;
	margin-top: 3rem;
}

.cta-button {
	display: inline-block;
	background: linear-gradient(
		135deg,
		color-mix(in srgb, var(--color-accent-cyan), var(--color-primary)),
		var(--color-primary)
	);
	border-radius: 8px;
	color: var(--color-bg);
	font-weight: 700;
	padding: 12px 32px;
	text-transform: uppercase;
	letter-spacing: 0.05em;
	transition: all 0.3s ease;

	&:hover,
	&:active {
		box-shadow: 0 4px 15px
			color-mix(in srgb, var(--color-primary) 40%, transparent);
		transform: translateY(-2px);
		color: var(--color-bg);
	}
}
</style>
