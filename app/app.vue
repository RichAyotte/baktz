<template>
	<header class="sticky-header" :class="{ 'is-scrolled': isScrolled }">
		<div class="header-container">
			<a href="#home" class="logo-link">
				<baktz-logo size="1.8rem" :is-link="true" />
			</a>
			<nav class="desktop-nav">
				<a
					href="#features"
					:class="{ active: activeSection === 'features' }"
					@click="onNavClick('features')"
				>Features</a>
				<a
					href="#stats"
					:class="{ active: activeSection === 'stats' }"
					@click="onNavClick('stats')"
				>Metrics</a>
				<a
					href="#russignol"
					:class="{
						active: activeSection === 'russignol',
					}"
					@click="onNavClick('russignol')"
				>Russignol</a>
				<a
					href="#about"
					:class="{ active: activeSection === 'about' }"
					@click="onNavClick('about')"
				>About</a>
			</nav>
		</div>
	</header>

	<diamond-background />

	<main>
		<section-home id="home" />
		<section-features id="features" />
		<section-baker-stats id="stats" />
		<section-russignol id="russignol" />
		<section-about id="about" />
	</main>
</template>

<script setup lang="ts">
const activeSection = ref('home')
const isScrolled = ref(false)

let observer: IntersectionObserver | null = null
let navClickActive = false

function onNavClick(section: string) {
	activeSection.value = section
	navClickActive = true
	setTimeout(() => {
		navClickActive = false
	}, 1000)
}

function onScroll() {
	isScrolled.value = window.scrollY > 100
	if (navClickActive) return
	const atBottom =
		window.innerHeight + window.scrollY >=
		document.documentElement.scrollHeight - 50
	if (atBottom) activeSection.value = 'about'
}

onMounted(() => {
	observer = new IntersectionObserver(
		(entries) => {
			if (navClickActive) return
			for (const entry of entries) {
				if (entry.isIntersecting) {
					activeSection.value = entry.target.id
				}
			}
		},
		{ rootMargin: '-20% 0px -70% 0px' },
	)

	const sectionIds = ['home', 'features', 'stats', 'russignol', 'about']
	for (const id of sectionIds) {
		const el = document.getElementById(id)
		if (el) observer.observe(el)
	}

	window.addEventListener('scroll', onScroll, { passive: true })
	onScroll()
})

onUnmounted(() => {
	observer?.disconnect()
	window.removeEventListener('scroll', onScroll)
})
</script>

<style scoped>
.sticky-header {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	z-index: 1000;
	background: color-mix(
		in srgb,
		var(--color-bg-surface) 70%,
		transparent
	);
	backdrop-filter: blur(12px);
	border-bottom: 1px solid var(--color-table-border);
	padding: 15px 0;
	box-shadow: 0 4px 30px rgba(0, 0, 0, 0.2);
	transition:
		padding 0.3s ease,
		background 0.3s ease,
		box-shadow 0.3s ease;
}

.sticky-header.is-scrolled {
	padding: 8px 0;
	background: color-mix(
		in srgb,
		var(--color-bg-surface) 85%,
		transparent
	);
	box-shadow: 0 4px 30px rgba(0, 0, 0, 0.35);
}

.header-container {
	max-width: var(--max-content-width);
	margin: 0 auto;
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 0 15px;

	@media (width >= 768px) {
		padding: 0 30px;
	}
}

.desktop-nav {
	display: none;
	gap: 32px;

	@media (width >= 768px) {
		display: flex;
	}
}

.desktop-nav a {
	position: relative;
	color: var(--color-text);
	font-weight: 600;
	font-size: 1.05rem;
	letter-spacing: 0.02em;
	padding-bottom: 4px;
	transition:
		color 0.3s ease,
		text-shadow 0.3s ease;
}

.desktop-nav a::after {
	content: '';
	position: absolute;
	bottom: 0;
	left: 50%;
	width: 0;
	height: 2px;
	background: linear-gradient(
		90deg,
		var(--color-accent-cyan),
		var(--color-accent-indigo)
	);
	border-radius: 1px;
	transition:
		width 0.3s ease,
		left 0.3s ease,
		opacity 0.3s ease;
}

.desktop-nav a:hover {
	color: #fff;
	text-shadow: 0 0 10px
		color-mix(in srgb, var(--color-primary) 40%, transparent);
}

.desktop-nav a:hover::after {
	width: 100%;
	left: 0;
	opacity: 0.5;
}

.desktop-nav a.active {
	color: #fff;
}

.desktop-nav a.active::after {
	width: 100%;
	left: 0;
	opacity: 1;
}

main {
	padding-top: 100px;

	& > * {
		max-width: var(--max-content-width);
		margin: 0 auto;
		padding: clamp(60px, 8vw, 120px) 20px;
		scroll-margin-top: 80px; /* Offset for sticky header */

		@media (width >= 768px) {
			padding-inline: 30px;
		}
	}

	& > *:first-child {
		padding-block: 0;
	}

	/* Add a subtle gradient divider line between sections */
	& > section:not(:first-child) {
		position: relative;
	}

	& > section:not(:first-child)::before {
		content: "";
		position: absolute;
		top: 0;
		left: 10%;
		width: 80%;
		height: 2px;
		background: linear-gradient(
			90deg,
			transparent 0%,
			color-mix(in srgb, var(--color-primary) 30%, transparent) 50%,
			transparent 100%
		);
	}
}

.logo-link:hover {
	text-decoration: none;
}

.logo-link {
	display: flex;
	align-items: center;
}
</style>
