import inject from '@rollup/plugin-inject'
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill'
import { defineNuxtConfig } from 'nuxt/config'
import pkg from './package.json'

export default defineNuxtConfig({
	app: {
		head: {
			charset: 'utf-8',
			htmlAttrs: {
				lang: 'en',
			},
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
				{ rel: 'mask-icon', href: '/safari-pinned-tab.svg', color: '#5bbad5' },
			],
			meta: [
				{
					hid: 'description',
					name: 'description',
					content: pkg.description,
				},
				{ name: 'msapplication-TileColor', content: '#da532c' },
				{ name: 'theme-color', content: '#ffffff' },
			],
			title: pkg.name,
		},
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
