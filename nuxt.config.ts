import inject from '@rollup/plugin-inject'
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill'
import pkg from './package.json'
import { defineNuxtConfig } from 'nuxt/config'
import { resolve } from 'path'

export default defineNuxtConfig({
	app: {
		head: {
			title: pkg.name,
			meta: [
				{
					hid: 'description',
					name: 'description',
					content: pkg.description,
				},
			],
			link: [
				{
					href: `https://fonts.googleapis.com`,
					rel: `preconnect`,
				},
				{
					href: `https://fonts.gstatic.com`,
					rel: `preconnect`,
					crossorigin: 'anonymous',
				},
				{
					href: `https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@600&family=Roboto:wght@300&display=swap`,
					rel: `stylesheet`,
				},
			],
		},
	},
	css: ['@/assets/styles/global.scss'],
	nitro: {
		preset: 'cloudflare_pages',
	},
	ssr: false,
	vite: {
		optimizeDeps: {
			esbuildOptions: {
				define: {
					global: 'globalThis',
				},
				plugins: [
					NodeGlobalsPolyfillPlugin({
						buffer: true,
					}),
				],
			},
		},
		build: {
			target: 'esnext',
			commonjsOptions: {
				transformMixedEsModules: true,
			},
			rollupOptions: {
				plugins: [inject({ Buffer: ['buffer', 'Buffer'] })],
			},
		},
		resolve: {
			alias: {
				'@airgap/beacon-sdk': resolve(
					`node_modules/@airgap/beacon-sdk/dist/esm/index.js`
				),
				'readable-stream': 'vite-compatible-readable-stream',
				stream: 'vite-compatible-readable-stream',
			},
		},
	},
})
