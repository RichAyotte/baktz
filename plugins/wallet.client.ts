import { defineNuxtPlugin } from 'nuxt/app'
import { baktzDelegateAddress } from '/constants'

export default defineNuxtPlugin(async () => {
	const { RpcClient } = await import('@taquito/rpc')

	const tezosNode = new RpcClient(
		'https://mainnet.api.tez.ie',
		'NetXdQprcVkpaWU'
	)

	const { DAppClient, TezosOperationType } = await import('@airgap/beacon-dapp')
	const dAppClient = new DAppClient({ name: `baktz` })
	const activeAccount = await dAppClient.getActiveAccount()

	if (activeAccount?.address) {
		const delegateAddress = await tezosNode.getDelegate(activeAccount?.address)
		if (delegateAddress === baktzDelegateAddress) {
			// do something
		}
	}

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
