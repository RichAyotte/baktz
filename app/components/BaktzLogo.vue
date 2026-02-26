<template>
	<span
		class="baktz-logo"
		:class="{ 'is-link': isLink }"
		:style="{ fontSize: size }"
	>
		<span class="bak">bāk</span><span class="tz">ꜩ</span>
	</span>
</template>

<script setup lang="ts">
defineProps<{
	isLink?: boolean
	size?: string
}>()
</script>

<style scoped>
.baktz-logo {
	font-family: 'Inter', sans-serif;
	font-weight: 700;
	letter-spacing: -0.05em;
	display: inline-flex;
	align-items: baseline;
	line-height: 1.4; /* More height to ensure no clipping of glows/sheens */
	user-select: none;
	-webkit-font-smoothing: antialiased;
	position: relative;
	padding: 0.1em 0.05em; /* Padding all around for shadows and sheens */
}

.bak {
	color: #ffffff;
	font-weight: 700;
	/* Smooth 'Brushed Silver' with a soft top-light highlight */
	background: linear-gradient(
		135deg,
		#ffffff 0%,
		#f1f5f9 30%,
		#cbd5e1 60%,
		#94a3b8 100%
	);
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;
	background-clip: text;
	
	/* Multi-layered shadow for a floating effect */
	filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3))
	        drop-shadow(0 10px 20px rgba(0, 0, 0, 0.4));
	
	padding-right: 0.02em;
}

.tz {
	font-family: 'Inter', sans-serif;
	font-weight: 700;
	margin-left: -0.02em;
	display: inline-block;
	transform: translateY(0.04em);
	
	/* 'Sapphire Crystal' - smooth cyan-to-indigo gem depth */
	background: linear-gradient(
		135deg,
		var(--color-accent-cyan) 0%,   /* Diamond Cyan */
		var(--color-accent-indigo) 100%  /* Indigo Base */
	);
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;
	background-clip: text;
	
	/* Rich glow that matches the 'Diamond Hands' theme */
	filter: drop-shadow(0 0 20px color-mix(in srgb, var(--color-accent-cyan) 35%, transparent))
	        drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3));
	
	position: relative;
}

.is-link {
	cursor: pointer;
	transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.is-link:hover {
	transform: scale(1.05) translateY(-1px);
	filter: brightness(1.15);
}

.is-link:hover .tz {
	filter: drop-shadow(0 0 30px color-mix(in srgb, var(--color-accent-cyan) 60%, transparent))
	        drop-shadow(0 6px 12px rgba(0, 0, 0, 0.4));
}

/* Add a subtle animation to the glow */
@keyframes pulse-glow {
	0%, 100% { filter: drop-shadow(0 0 20px color-mix(in srgb, var(--color-accent-cyan) 35%, transparent)) drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3)); }
	50% { filter: drop-shadow(0 0 35px color-mix(in srgb, var(--color-accent-cyan) 55%, transparent)) drop-shadow(0 6px 12px rgba(0, 0, 0, 0.4)); }
}

.tz {
	animation: pulse-glow 4s ease-in-out infinite;
}
</style>
