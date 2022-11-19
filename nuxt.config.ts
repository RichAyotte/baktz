import { defineNuxtConfig } from 'nuxt/config'
import pkg from './package.json'

export default defineNuxtConfig({
	css: ['@/assets/styles/global.scss'],
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
	ssr: false,
})
