import {defineNuxtConfig} from 'nuxt3'
import pkg from './package.json'

// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
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
	}
})
