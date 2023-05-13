import inject from '@rollup/plugin-inject'
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill'
import { defineNuxtConfig } from 'nuxt/config'
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
					rel: `preload`,
					as: `style`,
					onload: `this.rel='stylesheet'`,
				},
			],
		},
	},
	build: {
		analyze: true,
	},
	css: ['@/assets/styles/global.scss'],
	devtools: true,
	image: {
		dir: 'assets/images',
	},
	modules: ['@nuxt/image-edge'],
	ssr: true,
	vite: {
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
				'readable-stream': 'vite-compatible-readable-stream',
				stream: 'vite-compatible-readable-stream',
			},
		},
	},
})
