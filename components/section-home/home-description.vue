<template>
	<div id="home-description">
		<p>
			<img
				class="img-text"
				src="~/assets/images/baktz-logo.svg"
				style="height: 21px"
			/>
			is a secure, reliable, and community involved Tezos baking service.
		</p>
		<p>Copy the address below and paste it into your wallet's baking feature.</p>
		<div
			id="delegate-address-container"
			@click="copyToClipboard(delegateAddress)"
		>
			<div id="delegate-address">
				{{ delegateAddress }}
			</div>

			<img src="~/assets/images/clipboard.svg" />
		</div>
	</div>
</template>
<script setup lang="ts">
import { notify } from '@kyvg/vue3-notification'

const copyToClipboard = async (text: string): Promise<void> => {
	try {
		await navigator.clipboard.writeText(text)
		notify({
			text: `copied to clipboard`,
			title: text,
		})
	} catch (error) {
		// Some browsers don't allow writing to the clipboard.
		// Fail silently since we already know why.
	}
}
const delegateAddress = `tz1R4PuhxUxBBZhfLJDx2nNjbr7WorAPX1oC`
</script>

<style lang="scss" scoped>
@import '~/assets/styles/variables';
#home-description {
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
</style>