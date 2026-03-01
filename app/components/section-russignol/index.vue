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
		<div class="card-grid">
			<feature-box
				class="gradient-box-border"
				title="Speed"
				stat="~6ms"
				stat-label="BLS signatures"
				description="Rust with the audited <a href='https://github.com/supranational/blst' target='_blank' rel='noopener'>blst</a> library and no garbage collector. A 7.4MB system image means fast boot and nothing unnecessary running."
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
	display: grid;
	grid-template-columns: 1fr;
	gap: 24px;

	@media (width >= 768px) {
		grid-template-columns: repeat(3, 1fr);
	}
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
