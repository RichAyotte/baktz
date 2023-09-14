import { defineNuxtPlugin } from 'nuxt/app'
import { baktzDelegateAddress } from '~/constants'
import { ref } from 'vue'

type Delegate = {
	alias: string
	address: string
	active: boolean
}

async function getDelegate(address: string): Promise<Delegate | null> {
	const request = `https://api.tzkt.io/v1/accounts?address=${address}`
	const response = await fetch(request)
	const [{ delegate }] = await response.json()
	return delegate
}

export default defineNuxtPlugin(async () => {
	const { RpcClient } = await import('@taquito/rpc')

	const tezosNode = new RpcClient(
		'https://mainnet.api.tez.ie',
		'NetXdQprcVkpaWU'
	)

	const { DAppClient, TezosOperationType } = await import('@airgap/beacon-dapp')
	const dAppClient = new DAppClient({
		name: `baktz`,
		featuredWallets: ['exodus', 'kukai', 'plenty', 'temple'],
	})
	const activeAccount = ref(await dAppClient.getActiveAccount())

	if (activeAccount?.value?.address) {
		const delegateAddress = await tezosNode.getDelegate(
			activeAccount?.value?.address
		)
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
						const delegate = await getDelegate(account.address)
						if (delegate == null || delegate.address !== baktzDelegateAddress) {
							await dAppClient.requestOperation({
								operationDetails: [
									{
										kind: TezosOperationType.DELEGATION,
										delegate: baktzDelegateAddress,
									},
								],
							})
						}
						activeAccount.value = account
					}
				} catch (error) {
					console.log(error)
				}
			},
			async disconnect() {
				await dAppClient.clearActiveAccount()
				activeAccount.value = await dAppClient.getActiveAccount()
			},
		},
	}
})
