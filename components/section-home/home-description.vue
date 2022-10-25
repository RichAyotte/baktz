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
// @use 'sass:color';
@import '~/assets/styles/variables';
#home-description {
	// max-width: 30vh;
	text-align: center;
	p {
		font-size: larger;
	}
	button {
		margin: 30px 0;
	}
}
#delegate-address-container {
	max-width: calc(100% - 10px);
	background-color: $background-color;
	display: inline-flex;
	flex-wrap: wrap;
	img {
		padding: 11px;
		background: $primary-accent-color;
	}
}

#delegate-address {
	width: 50%;
	border: 1px solid $primary-accent-color;
	flex: 1 1;
	font-family: 'JetBrains Mono', monospace;
	overflow-wrap: break-word;
	padding: 10px;
}
</style>