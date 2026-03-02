<template>
	<section class="section-baker-stats">
		<div class="stats-container">
			<h2 class="section-heading">Metrics</h2>

			<h3 class="group-heading">Returns</h3>
			<div class="stats-row">
				<StatCard
					label="Staker APY"
					tooltip="Estimated annual return for stakers after a 5% fee. Stakers lock tez with the baker to earn higher rewards."
					:value="stats?.apyStaker != null ? formatPct(stats.apyStaker) : '—'"
				/>
				<StatCard
					label="Delegator APY"
					tooltip="Estimated annual return for delegators after a 10% fee. Delegators keep tez liquid in their wallet while earning rewards."
					:value="stats?.apyDelegator != null ? formatPct(stats.apyDelegator) : '—'"
				/>
			</div>

			<h3 class="group-heading">Capacity</h3>
			<div class="capacity-row">
				<CapacityBar
					v-if="stats?.stakingCapacity"
					label="Staking"
					tooltip="Staking capacity currently in use. Stakers lock their tez with the baker to earn higher rewards."
					:percentage="stats.stakingCapacity.percentage"
					:free="formatTez(stats.stakingCapacity.free)"
					bar-color="var(--color-accent-cyan)"
				/>
				<StatCard
					v-else
					label="Staking"
					tooltip="Staking capacity currently in use. Stakers lock their tez with the baker to earn higher rewards."
					value="—"
				/>
				<CapacityBar
					v-if="stats?.delegationCapacity"
					label="Delegation"
					tooltip="Delegation capacity currently in use. Delegators keep their tez liquid in their own wallet while earning rewards."
					:percentage="stats.delegationCapacity.percentage"
					:free="formatTez(stats.delegationCapacity.free)"
					bar-color="#f59e0b"
				/>
				<StatCard
					v-else
					label="Delegation"
					tooltip="Delegation capacity currently in use. Delegators keep their tez liquid in their own wallet while earning rewards."
					value="—"
				/>
			</div>

			<h3 class="group-heading">Performance</h3>
			<div class="stats-row">
				<StatCard
					label="Attest Rate"
					tooltip="Reliability in confirming new blocks. Missed attestations can be caused by other unreliable bakers and not necessarily by our infrastructure."
					:value="stats?.attestRate != null ? formatPct(stats.attestRate) : '—'"
					:prefix="stats?.attestRate != null ? '&#10003; ' : undefined"
				/>
				<StatCard
					label="DAL Rate"
					tooltip="Data Availability Layer attestation rate. Indicates active support for Tezos data publishing."
					:value="stats?.dalSlots != null ? formatPct(stats.dalSlots) : '—'"
					:prefix="stats?.dalSlots != null ? '&#10003; ' : undefined"
				/>
			</div>

			<h3 class="group-heading">Settings</h3>
			<div class="stats-row">
				<StatCard
					label="BLS Signer"
					tooltip="Indicates use of a tz4 (BLS) consensus key, which reduces consensus data by ~63x and helps activate 'All Bakers Attest' for improved network security."
					:value="stats?.tz4Signer != null ? (stats.tz4Signer ? 'Yes' : 'No') : '—'"
					:prefix="stats?.tz4Signer ? '&#10003; ' : undefined"
				/>
				<StatCard
					label="Liquidity Baking"
					tooltip="Vote on the Tezos built-in liquidity program. Bakers vote On, Off, or Pass each block."
					:value="lbDisplay"
				/>
			</div>

			<p class="data-sources">
				Data from
				<a href="https://ecadlabs.com" target="_blank">ECAD Labs</a>
				&amp;
				<a href="https://tzkt.io" target="_blank">TzKT</a>
			</p>
		</div>
	</section>
</template>

<script setup lang="ts">
import CapacityBar from './capacity-bar.vue'
import StatCard from './stat-card.vue'

const { stats } = useBakerStats()

const voteLabels = { on: 'On', off: 'Off', pass: 'Pass' } as const
const lbDisplay = computed(() => {
	const lb = stats.value?.liquidityBaking
	if (!lb) return '—'
	const vote = lb.bakerVote != null ? voteLabels[lb.bakerVote] : '—'
	return vote
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

.stats-container {
	max-width: 900px;
	margin: 0 auto;
}

.section-heading {
	text-align: center;
	font-size: clamp(1.4rem, 3vw, 2rem);
	font-weight: 700;
	color: var(--color-text);
	letter-spacing: 0.02em;
	margin: 0 0 2.5rem;
}

.group-heading {
	font-size: 1.1rem;
	font-weight: 600;
	color: var(--color-text-muted);
	letter-spacing: 0.05em;
	text-transform: uppercase;
	margin: 2rem 0 1rem;
	padding-left: 4px;
}

.group-heading:first-of-type {
	margin-top: 0;
}

.stats-row {
	display: grid;
	gap: 16px;
	grid-template-columns: repeat(2, 1fr);
}

.capacity-row {
	display: grid;
	gap: 16px;
	grid-template-columns: 1fr;

	@media (width >= 768px) {
		grid-template-columns: repeat(2, 1fr);
	}
}

.data-sources {
	text-align: center;
	color: var(--color-text-muted);
	font-size: 0.8rem;
	margin-top: 3rem;
}
</style>
