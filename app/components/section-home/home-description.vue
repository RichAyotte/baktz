<template>
	<div id="home-description">
		<client-only>
			<span v-if="$activeAccount != null">
				<strong>
					<a
						target="_blank"
						:href="`https://tzkt.io/${$activeAccount.address}/operations/`"
					>{{ $activeAccount.address }}</a>
				</strong>
				is currently baking with <baktz-logo size="1.2rem" />
				<br /><br />
				<button @click="$disconnect">Disconnect</button>
			</span>
			<span v-else class="action-container">
				<button
					id="delegate-button"
					@click="$delegate"
					class="primary-cta"
				>
					Connect Wallet to Bake
				</button>
				
				<div class="divider">
					<span>or bake manually</span>
				</div>
				
				<div
					id="delegate-address-container"
					:class="{ 'is-copied': isCopied }"
					@click="copyToClipboard(baktzDelegateAddress)"
				>
					<div id="delegate-address">
						{{ baktzDelegateAddress }}
					</div>
					<img
						alt="Clipboard"
						src="~/assets/images/clipboard.svg"
						style="aspect-ratio: 1/1"
					/>
					<div class="copied-overlay" v-if="isCopied">
						<span>Address Copied! 💎</span>
					</div>
				</div>
			</span>
		</client-only>
	</div>
</template>

<script setup lang="ts">
import { baktzDelegateAddress } from '~/constants'

const { $delegate, $activeAccount, $disconnect } = useNuxtApp()
const isCopied = ref(false)

async function copyToClipboard(text: string): Promise<void> {
	try {
		await navigator.clipboard.writeText(text)
		isCopied.value = true
		setTimeout(() => {
			isCopied.value = false
		}, 2000)
	} catch (error) {
		if (error instanceof Error) {
			console.error(error.message)
		}
	}
}
</script>

<style scoped>
#home-description {
	text-align: center;
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;

	p {
		font-size: clamp(1.1rem, 2vw, 1.5rem);
		line-height: 1.6;
		margin-bottom: 2.5rem;
		color: var(--color-text-muted);
		max-width: 650px;
	}
}

.action-container {
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;
}

.primary-cta {
	font-size: 1.1rem;
	padding: 16px 40px;
	box-shadow: 0 10px 25px color-mix(in srgb, var(--color-primary) 30%, transparent);
}

.divider {
	display: flex;
	align-items: center;
	text-align: center;
	width: 100%;
	max-width: 400px;
	margin: 2rem 0;
	color: var(--color-text-muted);
	font-size: 0.85rem;
	text-transform: uppercase;
	letter-spacing: 0.15em;
	font-weight: 600;
}

.divider::before,
.divider::after {
	content: '';
	flex: 1;
	border-bottom: 1px solid color-mix(in srgb, var(--color-text-muted) 20%, transparent);
}

.divider span {
	padding: 0 1rem;
}

#delegate-address-container {
	position: relative;
	background: color-mix(in srgb, var(--color-bg-surface) 60%, transparent);
	backdrop-filter: blur(10px);
	border: 1px solid var(--color-table-border);
	border-radius: 12px;
	display: inline-flex;
	align-items: center;
	overflow: hidden;
	width: 100%;
	max-width: 500px;
	cursor: pointer;
	transition: border-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease;
	
	&:hover {
		border-color: var(--color-primary);
		box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2), 0 0 0 2px color-mix(in srgb, var(--color-primary) 20%, transparent);
		transform: translateY(-2px);
	}

	&.is-copied {
		border-color: var(--color-secondary);
	}

	#delegate-address {
		font-family: 'JetBrains Mono', monospace;
		padding: 16px 20px;
		color: var(--color-text);
		flex-grow: 1;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		font-size: 1rem;
	}

	img {
		background: color-mix(in srgb, var(--color-primary) 10%, transparent);
		height: 24px;
		width: 24px;
		padding: 18px 24px;
		box-sizing: content-box;
		transition: background 0.3s ease;
	}
	
	&:hover img {
		background: color-mix(in srgb, var(--color-primary) 25%, transparent);
	}
}

.copied-overlay {
	position: absolute;
	inset: 0;
	background: var(--color-secondary);
	display: flex;
	align-items: center;
	justify-content: center;
	color: var(--color-bg);
	font-weight: 700;
	font-size: 1.1rem;
	animation: slide-in 0.3s ease-out forwards;
}

@keyframes slide-in {
	from { transform: translateY(100%); }
	to { transform: translateY(0); }
}

#button-or-address {
	padding: 1rem;
}
</style>
