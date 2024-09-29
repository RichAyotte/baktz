<template>
	<div id="home-description">
		<p>
			<nuxt-img
				alt="Baktz logo"
				class="img-text"
				loading="lazy"
				src="baktz-logo.svg"
				style="aspect-ratio: 361/127"
			/>
			is a secure, reliable, and community involved Tezos baking service.
		</p>
		<client-only>
			<span v-if="$activeAccount != null"
				><strong
					><a
						target="_blank"
						:href="`https://tzkt.io/${$activeAccount.address}/operations/`"
						>{{ $activeAccount.address }}</a
					></strong
				>
				is currently delegated to
				<nuxt-img
					alt="Baktz logo"
					class="img-text"
					src="baktz-logo.svg"
					style="aspect-ratio: 361/127"
				/>
				<br /><br />
				<button @click="$disconnect">Disconnect</button></span
			>
			<span v-else>
				<button
					id="delegate-button"
					@click="$delegate"
				>
					Delegate to Baktz
				</button>
				<br /><br />
				<strong style="color: white; font-size: 150%"><em>or</em></strong>
				<br />
				<p>
					Copy the address below and paste it into your wallet's baking feature.
				</p>
				<div
					id="delegate-address-container"
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
				</div>
			</span>
		</client-only>
	</div>
</template>
<script setup lang="ts">
import { notify } from '@kyvg/vue3-notification'
import { useNuxtApp } from 'nuxt/app'
import { baktzDelegateAddress } from '~/constants'

const { $delegate, $activeAccount, $disconnect } = useNuxtApp()

async function copyToClipboard(text: string): Promise<void> {
	try {
		await navigator.clipboard.writeText(text)
		notify({
			text: `copied to clipboard`,
			title: text,
		})
	} catch (error) {
		if (error instanceof Error) {
			notify({
				text: error.message,
				title: error.name,
			})
		}
	}
}
</script>

<style lang="scss" scoped>
@import '~/assets/styles/variables';
#home-description {
	align-self: start;
	text-align: center;
	p {
		font-size: larger;
	}
}

#delegate-address-container {
	background-color: $background-color;
	display: inline-grid;
	grid-template-columns: minmax(0, auto) minmax(0, auto);

	#delegate-address {
		border: 1px solid $primary-accent-color;
		font-family: 'JetBrains Mono', monospace;
		overflow-wrap: break-word;
		padding: 15px;
	}

	img {
		background: $primary-accent-color;
		height: calc(100% - 30px);
		padding: 15px;
	}
}
#button-or-address {
	padding: 1rem;
}
</style>