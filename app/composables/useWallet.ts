import { baktzDelegateAddress } from '~/constants'

type Delegate = {
	alias: string
	address: string
	active: boolean
}

// biome-ignore lint/suspicious/noExplicitAny: lazy-loaded SDK instance
let dAppClient: any
// biome-ignore lint/suspicious/noExplicitAny: lazy-loaded SDK enum
let TezosOperationType: any

async function ensureWalletLoaded() {
	if (!import.meta.client) return
	if (dAppClient) return

	const sdk = await import('@tezos-x/octez.connect-sdk')
	TezosOperationType = sdk.TezosOperationType
	dAppClient = new sdk.DAppClient({
		name: 'baktz',
		featuredWallets: ['exodus', 'kukai', 'plenty', 'temple'],
	})
}

async function getDelegate(address: string): Promise<Delegate | null> {
	const request = `https://api.tzkt.io/v1/accounts?address=${address}`
	const response = await fetch(request)
	const [{ delegate }] = await response.json()
	return delegate
}

export function useWallet() {
	const activeAccount = useState<{ address: string } | null>(
		'wallet-active-account',
		() => null,
	)
	const loading = ref(false)

	async function checkExistingSession() {
		try {
			if (!localStorage.getItem('beacon:active-account')) return
			await ensureWalletLoaded()
			const account = await dAppClient.getActiveAccount()
			if (account) {
				activeAccount.value = account
			}
		} catch (error) {
			console.error('Failed to check existing wallet session:', error)
		}
	}

	async function delegate() {
		loading.value = true
		try {
			await ensureWalletLoaded()

			let account = await dAppClient.getActiveAccount()
			if (!account) {
				await dAppClient.requestPermissions()
				account = await dAppClient.getActiveAccount()
			}

			if (account) {
				const existingDelegate = await getDelegate(account.address)
				if (
					existingDelegate == null ||
					existingDelegate.address !== baktzDelegateAddress
				) {
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
		} finally {
			loading.value = false
		}
	}

	async function disconnect() {
		await ensureWalletLoaded()
		await dAppClient.clearActiveAccount()
		activeAccount.value = null
	}

	return {
		activeAccount: readonly(activeAccount),
		loading: readonly(loading),
		delegate,
		disconnect,
		checkExistingSession,
	}
}
