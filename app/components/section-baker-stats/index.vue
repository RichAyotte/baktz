<template>
	<section class="section-baker-stats">
		<h2 class="section-heading">Performance</h2>

		<div class="capacity-row">
			<CapacityBar
				v-if="stats?.stakingCapacity"
				label="Staking Capacity"
				tooltip="Shows how much of the baker's staking capacity is in use. Stakers lock their tez with the baker and earn higher rewards than delegators."
				:percentage="stats.stakingCapacity.percentage"
				:free="formatTez(stats.stakingCapacity.free)"
				bar-color="var(--color-accent-cyan)"
			/>
			<StatCard
				v-else
				label="Staking Capacity"
				tooltip="Shows how much of the baker's staking capacity is in use. Stakers lock their tez with the baker and earn higher rewards than delegators."
				value="—"
			/>
			<CapacityBar
				v-if="stats?.delegationCapacity"
				label="Delegation Capacity"
				tooltip="Shows how much of the baker's delegation capacity is in use. Delegators keep their tez liquid in their own wallet while earning rewards."
				:percentage="stats.delegationCapacity.percentage"
				:free="formatTez(stats.delegationCapacity.free)"
				bar-color="#f59e0b"
			/>
			<StatCard
				v-else
				label="Delegation Capacity"
				tooltip="Shows how much of the baker's delegation capacity is in use. Delegators keep their tez liquid in their own wallet while earning rewards."
				value="—"
			/>
		</div>
		<div class="stats-row">
			<StatCard
				label="Attest Rate"
				tooltip="How reliably the baker confirms new blocks on the network. Higher is better — 100% means no missed attestations."
				:value="stats?.attestRate != null ? formatPct(stats.attestRate) : '—'"
				:prefix="stats?.attestRate != null ? '&#10003; ' : undefined"
			/>
			<StatCard
				label="DAL Rate"
				tooltip="Data Availability Layer attestation rate. DAL is a system for publishing data on Tezos. A high rate shows the baker is actively supporting this feature."
				:value="stats?.dalSlots != null ? formatPct(stats.dalSlots) : '—'"
				:prefix="stats?.dalSlots != null ? '&#10003; ' : undefined"
			/>
			<StatCard
				label="BLS Signer"
				tooltip="Whether the baker uses a tz4 (BLS) consensus key. BLS aggregates ~200 attestations per block into one, reducing consensus data by ~63x. Once 50% of bakers adopt tz4, 'All Bakers Attest' activates — every baker attests every block, improving security and reward consistency."
				:value="stats?.tz4Signer != null ? (stats.tz4Signer ? 'Yes' : 'No') : '—'"
				:prefix="stats?.tz4Signer ? '&#10003; ' : undefined"
				:subtitle="tz4AdoptionDisplay"
			/>
			<StatCard
				label="Staker APY"
				tooltip="Estimated annual return for stakers after a 5% baker fee. Stakers lock tez with the baker and earn higher rewards than delegators."
				:value="stats?.apyStaker != null ? formatPct(stats.apyStaker) : '—'"
			/>
			<StatCard
				label="Delegator APY"
				tooltip="Estimated annual return for delegators after a 10% baker fee. Delegators keep tez liquid in their wallet and earn rewards each cycle."
				:value="stats?.apyDelegator != null ? formatPct(stats.apyDelegator) : '—'"
			/>
			<StatCard
				label="Liquidity Baking"
				tooltip="The baker's vote on Tezos' built-in liquidity program. The EMA tracks network-wide sentiment — bakers vote On, Off, or Pass each block. If enough bakers vote Off to push the EMA to 100%, the subsidy is halted (but can restart if the EMA drops back)."
				:value="lbDisplay"
			/>
		</div>
		<p class="data-sources">
			Data from
			<a href="https://ecadlabs.com" target="_blank">ECAD Labs</a>
			&amp;
			<a href="https://tzkt.io" target="_blank">TzKT</a>
		</p>
	</section>
</template>

<script setup lang="ts">
import CapacityBar from './capacity-bar.vue'
import StatCard from './stat-card.vue'

const { stats } = useBakerStats()

const tz4AdoptionDisplay = computed(() => {
	const a = stats.value?.tz4Adoption
	if (!a) return undefined
	const pct = ((a.tz4Count / a.totalCount) * 100).toFixed(1)
	return `${a.tz4Count}/${a.totalCount} bakers (${pct}%) · 50% needed`
})

const voteLabels = { on: 'On', off: 'Off', pass: 'Pass' } as const
const lbDisplay = computed(() => {
	const lb = stats.value?.liquidityBaking
	if (!lb) return '—'
	const vote = lb.bakerVote != null ? voteLabels[lb.bakerVote] : '—'
	return `${vote} · ${formatPct(lb.emaPct)} EMA`
})

function formatTez(value: number): string {
	if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(1)}M`
	if (value >= 1_000) return `${(value / 1_000).toFixed(0)}K`
	return value.toFixed(0)
}

function formatPct(value: number): string {
	return `${value.toFixed(2)}%`
}
</script>

<style scoped>
.section-baker-stats {
	position: relative;
}

.section-heading {
	text-align: center;
	font-size: clamp(1.4rem, 3vw, 2rem);
	font-weight: 700;
	color: var(--color-text);
	letter-spacing: 0.02em;
	margin: 0 0 2.5rem;
}

.capacity-row {
	display: grid;
	gap: 16px;
	margin-bottom: 16px;
	grid-template-columns: 1fr;

	@media (width >= 768px) {
		grid-template-columns: 1fr 1fr;
	}
}

.stats-row {
	display: grid;
	gap: 16px;
	grid-template-columns: 1fr;

	@media (width >= 480px) {
		grid-template-columns: repeat(2, 1fr);
	}

	@media (width >= 768px) {
		grid-template-columns: repeat(3, 1fr);
	}
}

.data-sources {
	text-align: center;
	color: var(--color-text-muted);
	font-size: 0.8rem;
	margin-top: 1.5rem;
}
</style>
