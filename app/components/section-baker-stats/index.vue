<template>
	<section class="section-baker-stats">
		<h2 class="section-heading">Performance</h2>

		<div v-if="loading && !stats" class="loading">Loading stats...</div>
		<template v-else-if="stats">
			<div class="capacity-row">
				<CapacityBar
					v-if="stats.stakingCapacity"
					label="Staking Capacity"
					:percentage="stats.stakingCapacity.percentage"
					:free="formatTez(stats.stakingCapacity.free)"
					bar-color="var(--color-accent-cyan)"
				/>
				<StatCard v-else label="Staking Capacity" value="—" />
				<CapacityBar
					v-if="stats.delegationCapacity"
					label="Delegation Capacity"
					:percentage="stats.delegationCapacity.percentage"
					:free="formatTez(stats.delegationCapacity.free)"
					bar-color="#f59e0b"
				/>
				<StatCard v-else label="Delegation Capacity" value="—" />
			</div>
			<div class="stats-row">
				<StatCard
					label="Attest Rate"
					:value="stats.attestRate != null ? formatPct(stats.attestRate) : '—'"
					:prefix="stats.attestRate != null ? '&#10003; ' : undefined"
				/>
				<StatCard
					label="DAL"
					:value="stats.dalSlots ? `${stats.dalSlots.attested}/${stats.dalSlots.attestable}` : '—'"
					:prefix="stats.dalSlots ? '&#10003; ' : undefined"
				/>
				<StatCard
					label="TZ4 BLS Signer"
					:value="stats.tz4Signer != null ? (stats.tz4Signer ? 'Yes' : 'No') : '—'"
					:prefix="stats.tz4Signer ? '&#10003; ' : undefined"
				/>
				<StatCard
					label="APY (Staker · 5% fee)"
					:value="stats.apyStaker != null ? formatPct(stats.apyStaker) : '—'"
				/>
				<StatCard
					label="APY (Delegator · 10% fee)"
					:value="stats.apyDelegator != null ? formatPct(stats.apyDelegator) : '—'"
				/>
				<StatCard
					label="Liquidity Baking"
					:value="stats.liquidityBaking ? `${stats.liquidityBaking.bakerVoteOn ? 'On' : 'Off'} · ${formatPct(stats.liquidityBaking.emaPct)} EMA` : '—'"
				/>
			</div>
		</template>
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

const { stats, loading } = useBakerStats()

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

.loading {
	text-align: center;
	color: var(--color-text-muted);
	font-size: 1rem;
	padding: 40px 0;
}

.data-sources {
	text-align: center;
	color: var(--color-text-muted);
	font-size: 0.8rem;
	margin-top: 1.5rem;
}
</style>
