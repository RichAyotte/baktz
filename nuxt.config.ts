import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill'
import inject from '@rollup/plugin-inject'

export default defineNuxtConfig({
	app: {
		head: {
			charset: 'utf-8',
			htmlAttrs: {
				lang: 'en',
			},
			link: [
				{
					href: 'https://fonts.googleapis.com',
					rel: 'preconnect',
				},
				{
					href: 'https://fonts.gstatic.com',
					rel: 'preconnect',
					crossorigin: 'anonymous',
				},
				{
					href: 'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@600&family=Roboto:wght@300&display=swap',
					rel: 'preload',
					as: 'style',
					onload: "this.rel='stylesheet'",
				},
				{
					rel: 'apple-touch-icon',
					sizes: '180x180',
					href: '/apple-touch-icon.png',
				},
				{
					rel: 'icon',
					type: 'image/png',
					sizes: '32x32',
					href: '/favicon-32x32.png',
				},
				{
					rel: 'icon',
					type: 'image/png',
					sizes: '16x16',
					href: '/favicon-16x16.png',
				},
				{ rel: 'manifest', href: '/site.webmanifest' },
				{
					rel: 'mask-icon',
					href: '/safari-pinned-tab.svg',
					color: '#5bbad5',
				},
			],
			meta: [
				{
					name: 'description',
					content: 'bākꜩ - Tezos baking service',
				},
				{ name: 'msapplication-TileColor', content: '#da532c' },
				{ name: 'theme-color', content: '#ffffff' },
			],
			title: 'baktz-website',
		},
	},
	css: ['@/assets/styles/global.css'],
	devtools: { enabled: false },
	image: {
		dir: 'assets/images',
	},
	modules: ['@nuxt/image'],
	ssr: true,
	vite: {
		optimizeDeps: {
			esbuildOptions: {
				define: { global: 'globalThis' },
				plugins: [NodeGlobalsPolyfillPlugin({ buffer: true })],
			},
		},
		build: {
			assetsInlineLimit: 0,
			target: 'esnext',
			commonjsOptions: { transformMixedEsModules: true },
			rollupOptions: {
				plugins: [
					inject({
						Buffer: ['buffer', 'Buffer'],
					}) as any,
				],
			},
		},
		resolve: {
			alias: {
				'readable-stream': 'vite-compatible-readable-stream',
				stream: 'vite-compatible-readable-stream',
			},
		},
	},
	compatibilityDate: '2026-02-23',
})
