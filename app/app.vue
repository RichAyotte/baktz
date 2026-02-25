<template>
	<header class="sticky-header">
		<div class="header-container">
			<a href="#home" class="logo-link">
				<baktz-logo size="1.8rem" :is-link="true" />
			</a>
			<nav class="desktop-nav">
				<a href="#features">Features</a>
				<!-- <a href="#fees">Fees</a> -->
				<!-- <a href="#earnings">Earnings</a> -->
				<a href="#about">About</a>
			</nav>
		</div>
	</header>
	
	<diamond-background />

	<main>
		<section-home id="home" />
		<section-features id="features" />
		<!-- <section-fees id="fees" /> -->
		<!-- <section-earnings id="earnings" /> -->
		<section-about id="about" />
	</main>
</template>

<style scoped>
.sticky-header {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	z-index: 1000;
	background: rgba(30, 41, 59, 0.7);
	backdrop-filter: blur(12px);
	border-bottom: 1px solid var(--color-table-border);
	padding: 15px 0;
	box-shadow: 0 4px 30px rgba(0, 0, 0, 0.2);
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
	color: var(--color-text);
	font-weight: 600;
	font-size: 1.05rem;
	letter-spacing: 0.02em;
	transition: color 0.3s ease, text-shadow 0.3s ease;
}

.desktop-nav a:hover {
	color: var(--color-primary);
	text-shadow: 0 0 10px rgba(158, 175, 255, 0.4);
}

main {
	padding-top: 100px;

	& > * {
		max-width: var(--max-content-width);
		margin: 0 auto;
		padding: 80px 20px;
		scroll-margin-top: 80px; /* Offset for sticky header */
	}
	
	/* Pull the hero section and feature cards closer together */
	#home {
		padding-bottom: 40px;
	}
	
	#features {
		padding-top: 40px;
	}
	
	/* Add a very subtle gradient divider line between sections */
	& > section:not(:first-child) {
		position: relative;
	}
	
	& > section:not(:first-child)::before {
		content: '';
		position: absolute;
		top: 0;
		left: 10%;
		width: 80%;
		height: 1px;
		background: linear-gradient(
			90deg, 
			transparent 0%, 
			rgba(158, 175, 255, 0.15) 50%, 
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
