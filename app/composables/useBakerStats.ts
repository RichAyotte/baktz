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
	futureBlocks: number
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
	level: number
	lbToggle: boolean | null
}

interface TzKtDelegateConsensus {
	consensusAddress: string | null
}

export interface BakerStats {
	stakingCapacity: { percentage: number; free: number } | null
	delegationCapacity: { percentage: number; free: number } | null
	attestRate: number | null
	dalSlots: number | null
	tz4Signer: boolean | null
	tz4Adoption: { tz4Count: number; totalCount: number } | null
	apyStaker: number | null
	apyDelegator: number | null
	liquidityBaking: {
		emaPct: number
		bakerVote: 'on' | 'off' | 'pass' | null
	} | null
}

function mutezToTez(mutez: number): number {
	return mutez / 1_000_000
}

function fetch<T>(url: string, target: Ref<T | null>) {
	$fetch<T>(url)
		.then((v) => (target.value = v))
		.catch(() => {})
}

export function useBakerStats() {
	const addr = baktzDelegateAddress

	const delegate = ref<RpcDelegate | null>(null)
	const constants = ref<RpcConstants | null>(null)
	const rewards = ref<TzKtCycleRewards[] | null>(null)
	const blockMetadata = ref<RpcBlockMetadata | null>(null)
	const bakerBlocks = ref<TzKtBlock[] | null>(null)
	const allDelegates = ref<TzKtDelegateConsensus[] | null>(null)

	const stats = computed<BakerStats>(() => {
		const d = delegate.value
		const c = constants.value
		const r = rewards.value
		const meta = blockMetadata.value
		const blocks = bakerBlocks.value
		const delegates = allDelegates.value

		let stakingCapacity: BakerStats['stakingCapacity'] = null
		let delegationCapacity: BakerStats['delegationCapacity'] = null
		let attestRate: BakerStats['attestRate'] = null
		let dalSlots: BakerStats['dalSlots'] = null
		let tz4Signer: BakerStats['tz4Signer'] = null
		let tz4Adoption: BakerStats['tz4Adoption'] = null
		let apyStaker: BakerStats['apyStaker'] = null
		let apyDelegator: BakerStats['apyDelegator'] = null
		let liquidityBaking: BakerStats['liquidityBaking'] = null

		if (d && c) {
			const ownStaked = Number(d.own_staked)
			const externalStaked = Number(d.external_staked)
			const externalDelegated = Number(d.external_delegated)
			const multiplier = c.limit_of_delegation_over_baking
			const maxCapacity = ownStaked * multiplier

			stakingCapacity = {
				percentage:
					maxCapacity > 0 ? (externalStaked / maxCapacity) * 100 : 0,
				free: mutezToTez(Math.max(0, maxCapacity - externalStaked)),
			}

			delegationCapacity = {
				percentage:
					maxCapacity > 0
						? (externalDelegated / maxCapacity) * 100
						: 0,
				free: mutezToTez(Math.max(0, maxCapacity - externalDelegated)),
			}
		}

		if (d) {
			const participation = d.participation
			const currentExpected = participation.expected_cycle_activity
			const currentAttested = currentExpected - participation.missed_slots

			let histAttested = 0
			let histExpected = 0
			if (r) {
				const completed = r.filter((rw) => rw.futureBlocks === 0)
				histExpected = completed.reduce(
					(sum, rw) => sum + rw.expectedEndorsements,
					0,
				)
				const histMissed = completed.reduce(
					(sum, rw) => sum + rw.missedEndorsements,
					0,
				)
				histAttested = histExpected - histMissed
			}

			const totalExpected = currentExpected + histExpected
			const totalAttested = currentAttested + histAttested
			attestRate =
				totalExpected > 0 ? (totalAttested / totalExpected) * 100 : 100

			const attestable = d.dal_participation.delegate_attestable_dal_slots
			const attested = d.dal_participation.delegate_attested_dal_slots
			dalSlots = attestable > 0 ? (attested / attestable) * 100 : 100

			tz4Signer = d.consensus_key.active.pkh.startsWith('tz4')
		}

		if (delegates) {
			const totalCount = delegates.length
			const tz4Count = delegates.filter((del) =>
				del.consensusAddress?.startsWith('tz4'),
			).length
			tz4Adoption = { tz4Count, totalCount }
		}

		if (r && c) {
			const blocksPerCycle = c.blocks_per_cycle
			const minDelay = Number(c.minimal_block_delay)
			const cyclesPerYear = (365.25 * 86400) / (blocksPerCycle * minDelay)
			const completed = r.filter((rw) => rw.futureBlocks === 0)

			const stakerRates = completed
				.filter((rw) => rw.externalStakedBalance > 0)
				.map((rw) => {
					const reward =
						rw.blockRewardsStakedShared +
						rw.attestationRewardsStakedShared +
						rw.dalAttestationRewardsStakedShared
					return reward / rw.externalStakedBalance
				})
			if (stakerRates.length > 0) {
				const avg =
					stakerRates.reduce((a, b) => a + b, 0) / stakerRates.length
				apyStaker = avg * cyclesPerYear * 100
			}

			const delegatorRates = completed
				.filter((rw) => rw.externalDelegatedBalance > 0)
				.map((rw) => {
					const reward =
						rw.blockRewardsDelegated +
						rw.attestationRewardsDelegated +
						rw.dalAttestationRewardsDelegated
					return (reward * 0.9) / rw.externalDelegatedBalance
				})
			if (delegatorRates.length > 0) {
				const avg =
					delegatorRates.reduce((a, b) => a + b, 0) /
					delegatorRates.length
				apyDelegator = avg * cyclesPerYear * 100
			}
		}

		if (meta) {
			const lbEmaThreshold = 1_000_000_000
			const emaPct =
				(meta.liquidity_baking_toggle_ema / lbEmaThreshold) * 100
			const bakerBlock = blocks?.[0] ?? null
			let bakerVote: 'on' | 'off' | 'pass' | null = null
			if (bakerBlock != null) {
				if (bakerBlock.lbToggle === true) bakerVote = 'on'
				else if (bakerBlock.lbToggle === false) bakerVote = 'off'
				else bakerVote = 'pass'
			}
			liquidityBaking = { emaPct, bakerVote }
		}

		return {
			stakingCapacity,
			delegationCapacity,
			attestRate,
			dalSlots,
			tz4Signer,
			tz4Adoption,
			apyStaker,
			apyDelegator,
			liquidityBaking,
		}
	})

	function refresh() {
		fetch(
			`${tezosRpcBase}/chains/main/blocks/head/context/delegates/${addr}`,
			delegate,
		)
		fetch(
			`${tezosRpcBase}/chains/main/blocks/head/context/constants`,
			constants,
		)
		fetch(
			`${tzktApiBase}/rewards/bakers/${addr}?limit=10&sort.desc=id&select=futureBlocks,expectedEndorsements,missedEndorsements,blockRewardsStakedShared,attestationRewardsStakedShared,dalAttestationRewardsStakedShared,blockRewardsDelegated,attestationRewardsDelegated,dalAttestationRewardsDelegated,externalStakedBalance,externalDelegatedBalance`,
			rewards,
		)
		fetch(`${tezosRpcBase}/chains/main/blocks/head/metadata`, blockMetadata)
		fetch(
			`${tzktApiBase}/blocks?proposer=${addr}&limit=1&sort.desc=level&select=level,lbToggle`,
			bakerBlocks,
		)
		fetch(
			`${tzktApiBase}/delegates?active=true&limit=500&select=address,consensusAddress`,
			allDelegates,
		)
	}

	if (import.meta.client) {
		refresh()
	}

	return { stats: readonly(stats), refresh }
}
