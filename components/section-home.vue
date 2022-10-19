<template>
	<section class="section-home">
		<div class="section-home-content"></div>
		<figure>
			<img
				id="baktz-tezzomboi"
				src="~/assets/images/batkz-tezzomboiz-transparent.webp"
				alt="Baked Tezzomboi smoking weed"
			/>
			<figcaption>
				<a href="https://objkt.com/asset/hicetnunc/468242"
					>Tezzomboiz Series 1: 076</a
				>
				<br />
				by
				<a href="https://mattbag3d.artstation.com/resume">mattbag3d</a>
			</figcaption>
		</figure>
		<div class="introduction">
			<div id="title-container">
				<h1>
					Professional<br />
					<img
						id="tezos-logo"
						src="~/assets/images/tezos-logo-horizontal-white.svg"
					/><br />
					Delegation Service
				</h1>
			</div>
			<p>
				<img
					class="text-logo"
					src="~/assets/images/baktz-logo.svg"
				/>
				is a secure, reliable, and community involved Tezos staking service.
			</p>
			<table id="staking-rules">
				<tr>
					<th>Fee</th>
					<td>10%</td>
				</tr>
				<tr>
					<th>Capacity</th>
					<td>2,500,000 ꜩ</td>
				</tr>
				<tr>
					<th>Free Space</th>
					<td>2,233,321 ꜩ</td>
				</tr>
			</table>
			<p>
				Copy the address below and paste it into your wallet's delegation feature.
			</p>
			<div
				class="delegate-address-container"
				@click="copyToClipboard(delegateAddress)"
			>
				<div class="delegate-address">
					{{ delegateAddress }}
				</div>

				<img src="~/assets/images/clipboard.svg" />
			</div>
		</div>
	</section>
</template>

<script setup lang="ts">
const copyToClipboard = async (text: string): Promise<void> =>
	navigator.clipboard.writeText(text)
const delegateAddress = `tz1R4PuhxUxBBZhfLJDx2nNjbr7WorAPX1oC`
</script>

<style lang="scss" scoped>
@use 'sass:color';
@import '~/assets/styles/variables';
@import 'include-media';

h1 {
	color: white;
	font-size: 20pt;
	font-weight: lighter;
}

figure {
	margin: 0;
	text-align: center;
}

#staking-rules {
	background-color: color.adjust(
		$background-color,
		$lightness: 5%,
		$alpha: -0.5
	);
	border-collapse: collapse;
	margin: 40px 0 0 0;
	width: 100%;
	td,
	th {
		padding: 10px;
		border: 1px solid color.adjust($background-color, $lightness: 25%);
		box-shadow: #000;
	}
	th {
		text-align: left;
	}
	td {
		color: white;
		font-style: italic;
		text-align: right;
	}
}

#title-container {
	margin: 40px 15px;
	justify-content: center;
	align-items: center;
	display: flex;
	flex-wrap: wrap;
	& > * {
		flex: 1 1 30vw;
	}
}

#tezos-logo {
	height: 40px;
	margin: 15px 0;
}

.section-home {
	align-items: stretch;
	box-sizing: border-box;
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	width: 100%;
	@include media('>desktop') {
		padding-top: 10%;
	}
}

#baktz-tezzomboi {
	width: 100%;
	@include media('landscape') {
		max-width: 30vw;
	}
	@include media('>tablet') {
		max-width: 30vw;
	}
}

.section-home {
	// min-height: 100vh;
	.introduction {
		text-align: center;
		p {
			font-size: larger;
		}
		button {
			margin: 30px 0;
		}
		@include media('landscape') {
			max-width: 50vw;
		}
		@include media('>tablet') {
			max-width: 50vw;
		}
		.text-logo {
			display: inline-block;
			height: 21px;
			vertical-align: text-bottom;
		}
	}
}

.delegate-address-container {
	margin-top: 30px;
	background-color: $background-color;
	border: 1px solid $primary-accent-color;
	display: flex;
	user-select: none;
	img {
		padding: 10px;
		background: $primary-accent-color;
	}
	.delegate-address {
		padding: 10px;
		max-width: calc(100vw - 100px);
		overflow-wrap: break-word;
		font-family: 'JetBrains Mono', monospace;
	}
}
</style>
