import { nodePolyfills } from 'vite-plugin-node-polyfills'

export default defineNuxtConfig({
	app: {
		head: {
			charset: 'utf-8',
			htmlAttrs: {
				lang: 'en',
			},
			link: [
				{
					rel: 'icon',
					type: 'image/svg+xml',
					href: '/baktz-icon.svg',
				},
				{
					rel: 'apple-touch-icon',
					sizes: '180x180',
					href: '/apple-touch-icon.png',
				},
				{
					rel: 'canonical',
					href: 'https://baktz.com',
				},
			],
			meta: [
				{
					name: 'description',
					content:
						'bākꜩ - Tezos baking, staking, and delegation service',
				},
				{ name: 'theme-color', content: '#0f172a' },
				{
					property: 'og:title',
					content: 'bākꜩ — Tezos Baking Service',
				},
				{
					property: 'og:description',
					content: 'bākꜩ - Tezos baking service',
				},
				{ property: 'og:type', content: 'website' },
				{ property: 'og:url', content: 'https://baktz.com' },
				{
					property: 'og:image',
					content: 'https://baktz.com/baktz-logo-500x500.webp',
				},
				{ name: 'twitter:card', content: 'summary' },
				{
					name: 'twitter:title',
					content: 'bākꜩ — Tezos Baking Service',
				},
				{
					name: 'twitter:description',
					content: 'bākꜩ - Tezos baking service',
				},
				{
					name: 'twitter:image',
					content: 'https://baktz.com/baktz-logo-500x500.webp',
				},
			],
			title: 'bākꜩ — Tezos Baking Service',
		},
	},
	css: ['@/assets/styles/global.css'],
	devtools: { enabled: false },
	image: {
		dir: 'assets/images',
	},
	fonts: {
		defaults: {
			styles: ['normal'],
			subsets: ['latin', 'latin-ext'],
			fallbacks: {
				'sans-serif': ['Arial'],
				monospace: ['Courier New'],
				serif: [],
				cursive: [],
				fantasy: [],
				'system-ui': [],
				'ui-serif': [],
				'ui-sans-serif': [],
				'ui-monospace': [],
				'ui-rounded': [],
				emoji: [],
				math: [],
				fangsong: [],
			},
		},
		families: [
			{
				name: 'Noto Sans',
				weights: [400, 600, 700],
				preload: true,
			},
			{
				name: 'JetBrains Mono',
				weights: [400],
				fallbacks: [],
			},
		],
	},
	features: {
		inlineStyles: true,
	},
	modules: ['@nuxt/fonts', '@nuxt/image'],
	nitro: {
		compressPublicAssets: true,
		externals: {
			inline: [],
		},
	},
	ssr: true,
	vite: {
		plugins: [
			nodePolyfills({
				include: [
					'buffer',
					'util',
					'stream',
					'events',
					'string_decoder',
					'process',
				],
				globals: { Buffer: true, global: true },
			}),
		],
		build: {
			assetsInlineLimit: 0,
			target: 'esnext',
			commonjsOptions: { transformMixedEsModules: true },
		},
	},
	compatibilityDate: '2026-02-23',
})
