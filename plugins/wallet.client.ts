import { defineNuxtPlugin } from 'nuxt/app'
import { DAppClient, TezosOperationType } from '@airgap/beacon-dapp'
import { RpcClient } from '@taquito/rpc'
import { baktzDelegateAddress } from '/constants'

const tezosNode = new RpcClient('https://mainnet.api.tez.ie', 'NetXdQprcVkpaWU')
const dAppClient = new DAppClient({ name: `baktz` })
const activeAccount = await dAppClient.getActiveAccount()

if (activeAccount?.address) {
	const delegateAddress = await tezosNode.getDelegate(activeAccount?.address)
	if (delegateAddress === baktzDelegateAddress) {
		// do something
	}
}

export default defineNuxtPlugin(() => {
	return {
		provide: {
			activeAccount,
			baktzDelegateAddress,
			async delegate() {
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
			},
		},
	}
})
