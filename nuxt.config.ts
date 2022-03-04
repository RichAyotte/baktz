import {defineNuxtConfig} from 'nuxt3'
import pkg from './package.json'

export default defineNuxtConfig({
	meta: {
		title: pkg.name
		, meta: [
			{
				hid: 'description'
				, name: 'description'
				, content: pkg.description
			}
		]
		, link: [
			{
				href: `https://fonts.googleapis.com`
				, rel: `preconnect`
			}
			, {
				href: `https://fonts.gstatic.com`
				, rel: `preconnect`
				, crossorigin: true
			}
			, {
				href: `https://fonts.googleapis.com/css2?family=Alegreya+Sans:wght@300&family=JetBrains+Mono:wght@500&display=swap`
				, rel: `stylesheet`
			}
		]
	}
})
