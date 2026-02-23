import { ref } from 'vue'

export type Toast = {
	id: number
	title: string
	text: string
}

const toasts = ref<Toast[]>([])
let nextId = 0

export function useToast() {
	function showToast(opts: { title: string; text: string }) {
		const id = nextId++
		toasts.value.push({ id, ...opts })
		setTimeout(() => dismissToast(id), 3000)
	}

	function dismissToast(id: number) {
		toasts.value = toasts.value.filter((t: Toast) => t.id !== id)
	}

	return { toasts, showToast, dismissToast }
}
