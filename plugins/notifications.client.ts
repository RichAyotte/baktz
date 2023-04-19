import { defineNuxtPlugin } from 'nuxt/app'
import Notification from '@kyvg/vue3-notification'

export default defineNuxtPlugin(nuxtApp => {
	nuxtApp.vueApp.use(Notification)
})
