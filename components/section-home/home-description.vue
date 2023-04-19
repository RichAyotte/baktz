<template>
	<div id="home-description">
		<p>
			<nuxt-img
				class="img-text"
				src="baktz-logo.svg"
			/>
			is a secure, reliable, and community involved Tezos baking service.
		</p>
		<p>Copy the address below and paste it into your wallet's baking feature.</p>
		<div
			id="delegate-address-container"
			@click="copyToClipboard(baktzDelegateAddress)"
		>
			<div id="delegate-address">
				{{ baktzDelegateAddress }}
			</div>

			<nuxt-img src="clipboard.svg" />
		</div>
		<br />
		<div id="button-or-address">
			<span v-if="activeAccount != null"
				><strong>{{ activeAccount.address.substring(0, 8) }}&#8230;</strong> is
				currently delegating to
				<nuxt-img
					class="img-text"
					src="baktz-logo.svg"
				/>
				Thank you!<button @click="switchWallet">Switch wallet</button></span
			>
			<button
				v-else
				id="delegate-button"
				@click="delegate"
			>
				Delegate now
			</button>
		</div>
	</div>
</template>
<script setup lang="ts">
import { notify } from '@kyvg/vue3-notification'
import { DAppClient, TezosOperationType } from '@airgap/beacon-dapp'
import { RpcClient } from '@taquito/rpc'
const tezosNode = new RpcClient('https://mainnet.api.tez.ie', 'NetXdQprcVkpaWU')
const baktzDelegateAddress = `tz1R4PuhxUxBBZhfLJDx2nNjbr7WorAPX1oC`
const dAppClient = new DAppClient({ name: `baktz` })
const activeAccount = await dAppClient.getActiveAccount()
if (activeAccount?.address) {
	const delegateAddress = await tezosNode.getDelegate(activeAccount?.address)
	if (delegateAddress === baktzDelegateAddress) {
		// do something
	}
}

function switchWallet() {
	console.log('not implemented yet')
}

async function delegate() {
	try {
		let account = await dAppClient.getActiveAccount()
		if (!account) {
			await dAppClient.requestPermissions()
			account = await dAppClient.getActiveAccount()
		}

		if (account) {
			await dAppClient.requestOperation({
				operationDetails: [
					{
						kind: TezosOperationType.DELEGATION,
						delegate: baktzDelegateAddress,
					},
				],
			})
		}
	} catch (error) {
		console.log(error)
	}
}

async function copyToClipboard(text: string): Promise<void> {
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