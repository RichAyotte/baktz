<template>
	<div>
		<a
			target="_blank"
			href="https://tezos.com"
			aria-label="Tezos"
		>
			<span class="icon tezos" />
		</a>
		<a
			target="_blank"
			href="https://github.com/RichAyotte"
			aria-label="GitHub"
		>
			<span class="icon github" />
		</a>
		<a
			target="_blank"
			href="https://www.linkedin.com/in/richayotte/"
			aria-label="LinkedIn"
		>
			<span class="icon linkedin" />
		</a>
		<a
			target="_blank"
			href="https://x.com/RichAyotte"
			aria-label="X (Twitter)"
		>
			<span class="icon x" />
		</a>
		<a
			target="_blank"
			href="https://ayottesoftware.com"
			aria-label="Home"
		>
			<span class="icon home" />
		</a>
	</div>
</template>

<style scoped>
div {
	align-items: center;
	align-self: start;
	display: flex;
	justify-self: center;

	@media (width >= 500px) {
		justify-self: left;
	}
}

a {
	align-items: center;
	background: rgba(255, 255, 255, 0.03);
	backdrop-filter: blur(8px);
	border: 1px solid rgba(255, 255, 255, 0.05);
	border-radius: 10px;
	display: inline-flex;
	height: 40px;
	justify-content: center;
	margin: 0 16px 0 0;
	text-decoration: none;
	transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
	width: 40px;

	&:hover {
		background: color-mix(in srgb, var(--color-primary) 8%, transparent);
		border-color: color-mix(in srgb, var(--color-primary) 20%, transparent);
		transform: translateY(-2px);

		.icon {
			background-color: var(--color-primary-light);
			filter: drop-shadow(0 0 8px color-mix(in srgb, var(--color-primary-light) 40%, transparent));
		}
	}
}

.icon {
	background-color: var(--color-text-muted);
	display: block;
	height: 20px;
	mask-repeat: no-repeat;
	mask-size: contain;
	mask-position: center;
	transition: all 0.3s ease;
	width: 20px;

	&.linkedin {
		mask-image: url("/assets/images/linkedin.svg");
	}

	&.x {
		mask-image: url("/assets/images/x-twitter-brands.svg");
	}

	&.github {
		mask-image: url("/assets/images/github.svg");
	}

	&.home {
		mask-image: url("/assets/images/house-solid.svg");
	}

	&.tezos {
		mask-image: url("/assets/images/tezos-symbol.svg");
	}
}
</style>
