import { resolve } from 'path'
import inject from '@rollup/plugin-inject'
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill'
import { defineNuxtConfig } from 'nuxt/config'
import { visualizer } from 'rollup-plugin-visualizer'
import pkg from './package.json'

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
	image: { dir: 'assets/images' },
	modules: ['@nuxt/image-edge'],
	ssr: false,
	vite: {
		plugins: [visualizer()],
		optimizeDeps: {
			esbuildOptions: {
				define: { global: 'globalThis' },
				plugins: [NodeGlobalsPolyfillPlugin({ buffer: true })],
			},
		},
		build: {
			target: 'esnext',
			commonjsOptions: { transformMixedEsModules: true },
			rollupOptions: {
				plugins: [
					inject({
						Buffer: ['buffer', 'Buffer'],
					}),
				],
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
