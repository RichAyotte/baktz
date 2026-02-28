import { baktzDelegateAddress, tezosRpcBase, tzktApiBase } from '~/constants'

interface RpcDelegateParticipation {
	expected_cycle_activity: number
	missed_slots: number
}

interface RpcDalParticipation {
	delegate_attested_dal_slots: number
	delegate_attestable_dal_slots: number
}

interface RpcDelegate {
	own_staked: string
	external_staked: string
	external_delegated: string
	consensus_key: {
		active: {
			pkh: string
		}
	}
	participation: RpcDelegateParticipation
	dal_participation: RpcDalParticipation
}

interface RpcConstants {
	blocks_per_cycle: number
	minimal_block_delay: string
	limit_of_delegation_over_baking: number
}

interface RpcBlockMetadata {
	liquidity_baking_toggle_ema: number
}

interface TzKtCycleRewards {
	cycle: number
	futureBlocks: number
	expectedBlocks: number
	expectedEndorsements: number
	missedEndorsements: number
	blockRewardsStakedShared: number
	attestationRewardsStakedShared: number
	dalAttestationRewardsStakedShared: number
	blockRewardsDelegated: number
	attestationRewardsDelegated: number
	dalAttestationRewardsDelegated: number
	externalStakedBalance: number
	externalDelegatedBalance: number
}

interface TzKtBlock {
	lbToggle: boolean | null
}

export interface BakerStats {
	stakingCapacity: { percentage: number; free: number } | null
	delegationCapacity: { percentage: number; free: number } | null
	attestRate: number | null
	dalSlots: { attested: number; attestable: number } | null
	tz4Signer: boolean | null
	apyStaker: number | null
	apyDelegator: number | null
	liquidityBaking: { emaPct: number; bakerVoteOn: boolean } | null
}

function mutezToTez(mutez: number): number {
	return mutez / 1_000_000
}

function settled<T>(result: PromiseSettledResult<T>): T | null {
	return result.status === 'fulfilled' ? result.value : null
}

function computeStats(
	delegate: RpcDelegate | null,
	constants: RpcConstants | null,
	rewards: TzKtCycleRewards[] | null,
	blockMetadata: RpcBlockMetadata | null,
	bakerBlock: TzKtBlock | null,
): BakerStats {
	let stakingCapacity: BakerStats['stakingCapacity'] = null
	let delegationCapacity: BakerStats['delegationCapacity'] = null
	let attestRate: BakerStats['attestRate'] = null
	let dalSlots: BakerStats['dalSlots'] = null
	let tz4Signer: BakerStats['tz4Signer'] = null
	let apyStaker: BakerStats['apyStaker'] = null
	let apyDelegator: BakerStats['apyDelegator'] = null
	let liquidityBaking: BakerStats['liquidityBaking'] = null

	if (delegate && constants) {
		const ownStaked = Number(delegate.own_staked)
		const externalStaked = Number(delegate.external_staked)
		const externalDelegated = Number(delegate.external_delegated)
		const multiplier = constants.limit_of_delegation_over_baking
		const maxCapacity = ownStaked * multiplier

		stakingCapacity = {
			percentage:
				maxCapacity > 0 ? (externalStaked / maxCapacity) * 100 : 0,
			free: mutezToTez(Math.max(0, maxCapacity - externalStaked)),
		}

		delegationCapacity = {
			percentage:
				maxCapacity > 0 ? (externalDelegated / maxCapacity) * 100 : 0,
			free: mutezToTez(Math.max(0, maxCapacity - externalDelegated)),
		}
	}

	if (delegate) {
		const participation = delegate.participation
		const currentExpected = participation.expected_cycle_activity
		const currentAttested = currentExpected - participation.missed_slots

		let histAttested = 0
		let histExpected = 0
		if (rewards) {
			const completed = rewards.filter((r) => r.futureBlocks === 0)
			histExpected = completed.reduce(
				(sum, r) => sum + r.expectedEndorsements,
				0,
			)
			const histMissed = completed.reduce(
				(sum, r) => sum + r.missedEndorsements,
				0,
			)
			histAttested = histExpected - histMissed
		}

		const totalExpected = currentExpected + histExpected
		const totalAttested = currentAttested + histAttested
		attestRate =
			totalExpected > 0 ? (totalAttested / totalExpected) * 100 : 100

		dalSlots = {
			attested: delegate.dal_participation.delegate_attested_dal_slots,
			attestable:
				delegate.dal_participation.delegate_attestable_dal_slots,
		}

		tz4Signer = delegate.consensus_key.active.pkh.startsWith('tz4')
	}

	if (rewards && constants) {
		const blocksPerCycle = constants.blocks_per_cycle
		const minDelay = Number(constants.minimal_block_delay)
		const cyclesPerYear = (365.25 * 86400) / (blocksPerCycle * minDelay)
		const completed = rewards.filter((r) => r.futureBlocks === 0)

		const stakerRates = completed
			.filter((r) => r.externalStakedBalance > 0)
			.map((r) => {
				const rw =
					r.blockRewardsStakedShared +
					r.attestationRewardsStakedShared +
					r.dalAttestationRewardsStakedShared
				return rw / r.externalStakedBalance
			})
		if (stakerRates.length > 0) {
			const avg =
				stakerRates.reduce((a, b) => a + b, 0) / stakerRates.length
			apyStaker = avg * cyclesPerYear * 100
		}

		const delegatorRates = completed
			.filter((r) => r.externalDelegatedBalance > 0)
			.map((r) => {
				const rw =
					r.blockRewardsDelegated +
					r.attestationRewardsDelegated +
					r.dalAttestationRewardsDelegated
				return (rw * 0.9) / r.externalDelegatedBalance
			})
		if (delegatorRates.length > 0) {
			const avg =
				delegatorRates.reduce((a, b) => a + b, 0) /
				delegatorRates.length
			apyDelegator = avg * cyclesPerYear * 100
		}
	}

	if (blockMetadata) {
		const lbEmaThreshold = 1_000_000_000
		const emaPct =
			(blockMetadata.liquidity_baking_toggle_ema / lbEmaThreshold) * 100
		const bakerVoteOn = bakerBlock?.lbToggle !== true
		liquidityBaking = { emaPct, bakerVoteOn }
	}

	return {
		stakingCapacity,
		delegationCapacity,
		attestRate,
		dalSlots,
		tz4Signer,
		apyStaker,
		apyDelegator,
		liquidityBaking,
	}
}

export function useBakerStats() {
	const stats = ref<BakerStats | null>(null)
	const loading = ref(true)

	const addr = baktzDelegateAddress

	async function refresh() {
		loading.value = true

		const [
			delegateResult,
			constantsResult,
			rewardsResult,
			metadataResult,
			bakerBlocksResult,
		] = await Promise.allSettled([
			$fetch<RpcDelegate>(
				`${tezosRpcBase}/chains/main/blocks/head/context/delegates/${addr}`,
			),
			$fetch<RpcConstants>(
				`${tezosRpcBase}/chains/main/blocks/head/context/constants`,
			),
			$fetch<TzKtCycleRewards[]>(
				`${tzktApiBase}/rewards/bakers/${addr}?limit=10&sort.desc=id`,
			),
			$fetch<RpcBlockMetadata>(
				`${tezosRpcBase}/chains/main/blocks/head/metadata`,
			),
			$fetch<TzKtBlock[]>(
				`${tzktApiBase}/blocks?baker=${addr}&limit=1&sort.desc=id`,
			),
		])

		const bakerBlocks = settled(bakerBlocksResult)
		stats.value = computeStats(
			settled(delegateResult),
			settled(constantsResult),
			settled(rewardsResult),
			settled(metadataResult),
			bakerBlocks?.[0] ?? null,
		)
		loading.value = false
	}

	if (import.meta.client) {
		refresh()
	}

	return {
		stats: readonly(stats),
		loading: readonly(loading),
		refresh,
	}
}
