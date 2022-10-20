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
					Reliable
					<img
						class="img-text"
						src="~/assets/images/tezos-logo-horizontal-white.svg"
					/>
					Delegation Service
				</h1>
			</div>
			<p>
				<img
					class="img-text"
					src="~/assets/images/baktz-logo.svg"
				/>
				is a secure, reliable, and community involved Tezos baking service.
			</p>
			<table id="baking-rules">
				<caption>
					<h2>Fees and capacity</h2>
				</caption>
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
			<p>Copy the address below and paste it into your wallet's baking feature.</p>
			<div
				id="delegate-address-container"
				@click="copyToClipboard(delegateAddress)"
			>
				<div id="delegate-address">
					{{ delegateAddress }}
				</div>

				<img src="~/assets/images/clipboard.svg" />
			</div>
		</div>
	</section>
</template>

<script setup lang="ts">
import { notify } from '@kyvg/vue3-notification'

const copyToClipboard = async (text: string): Promise<void> => {
	try {
		await navigator.clipboard.writeText(text)
		notify({
			text: `copied to clipboard`,
			title: text,
		})
	} catch (error) {
		// Some browsers don't allow writing to the clipboard.
		// Fail silently since we already know why.
	}
}
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

#baking-rules {
	background-color: color.adjust(
		$background-color,
		$lightness: 5%,
		$alpha: -0.5
	);
	border-collapse: collapse;
	margin: 70px auto;
	td,
	th {
		padding: 10px 25px;
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
	align-items: center;
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	margin: 60px 15px;
	h1 {
		font-size: clamp(2rem, 10vw, 4rem);
		img {
			height: clamp(3rem, 15vw, 5rem);
			vertical-align: middle;
		}
	}
	& > * {
		flex: 1 1 30vw;
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

.img-text {
	display: inline-block;
	vertical-align: text-bottom;
}

.section-home {
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
		.img-text {
			height: 21px;
		}
	}
}

#delegate-address-container {
	max-width: calc(100% - 10px);
	background-color: $background-color;
	display: inline-flex;
	flex-wrap: wrap;
	img {
		padding: 11px;
		background: $primary-accent-color;
	}
}

#delegate-address {
	width: 50%;
	border: 1px solid $primary-accent-color;
	flex: 1 1;
	font-family: 'JetBrains Mono', monospace;
	overflow-wrap: break-word;
	padding: 10px;
}
</style>
